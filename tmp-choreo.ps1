$ErrorActionPreference = 'Stop'

$files = @(
  '.\\slides\\parts\\pt-BR\\01-intro-sdd.html',
  '.\\slides\\parts\\pt-BR\\02-spec-kit.html',
  '.\\slides\\parts\\pt-BR\\03-copilot.html',
  '.\\slides\\parts\\pt-BR\\04-context-progressive.html',
  '.\\slides\\parts\\pt-BR\\05-refs-end.html'
)

function Strip-Html([string]$html){
  $t = [regex]::Replace($html, '<[^>]+>', ' ')
  $t = [regex]::Replace($t, '\s+', ' ').Trim()
  return $t
}

foreach($file in $files){
  $content = Get-Content -Raw $file
  $asideMatches = [regex]::Matches($content, '<aside class="notes">[\s\S]*?<\/aside>')
  if($asideMatches.Count -eq 0){ continue }

  $newContent = $content
  for($m = $asideMatches.Count - 1; $m -ge 0; $m--){
    $aside = $asideMatches[$m]
    $asideText = $aside.Value

    $before = $content.Substring(0, $aside.Index)
    $sectionStart = $before.LastIndexOf('<section')
    if($sectionStart -lt 0){ continue }
    $sectionSlice = $content.Substring($sectionStart, $aside.Index - $sectionStart)

    $fragCount = ([regex]::Matches($sectionSlice, 'class="[^"]*fragment[^"]*"')).Count
    $hasSeta = $asideText -match 'Seta 0 \(antes de avançar\)'

    if($hasSeta){ continue }

    $append = ''
    if($fragCount -gt 0){
      $labels = @()
      $fragBlocks = [regex]::Matches($sectionSlice, '<[^>]*class="[^"]*fragment[^"]*"[^>]*>[\s\S]*?<\/[^>]+>')
      foreach($fb in $fragBlocks){
        if($labels.Count -ge 8){ break }
        $block = $fb.Value
        $h3 = [regex]::Match($block, '<h3[^>]*>([\s\S]*?)<\/h3>')
        if($h3.Success){
          $label = Strip-Html($h3.Groups[1].Value)
        } else {
          $txt = Strip-Html($block)
          if($txt.Length -gt 48){ $txt = $txt.Substring(0,48).Trim() + '...' }
          $label = $txt
        }
        if($label -and -not ($labels -contains $label)){ $labels += $label }
      }

      if($labels.Count -eq 0){
        $append = '<p>Seta 0 (antes de avançar): contextualize o objetivo deste slide para a audiência. Seta 1 em diante: acompanhe cada elemento que aparece na tela, sempre conectando com impacto prático. Fechamento do slide: recapitule a mensagem central antes de avançar.</p>'
      } else {
        $parts = @('Seta 0 (antes de avançar): contextualize o objetivo deste slide para a audiência')
        for($i=0; $i -lt $labels.Count; $i++){
          $n = $i + 1
          $parts += ('Seta {0}: explique "{1}" em linguagem natural, conectando com o problema real' -f $n, $labels[$i])
        }
        $parts += 'Fechamento do slide: amarre os pontos exibidos e faça a transição para o próximo conteúdo'
        $append = '<p>' + (($parts -join '. ') + '.') + '</p>'
      }
    } else {
      $append = '<p>Seta 0 (antes de avançar): abra o contexto deste slide e diga por que este ponto importa. Fechamento do slide: resuma em uma frase a ideia principal antes de seguir.</p>'
    }

    $updatedAside = [regex]::Replace($asideText, '<\/aside>$', "  $append`r`n  </aside>")
    $newContent = $newContent.Remove($aside.Index, $aside.Length).Insert($aside.Index, $updatedAside)
  }

  Set-Content -Path $file -Value $newContent -Encoding utf8
}

Write-Output 'All notes normalized with choreography.'
