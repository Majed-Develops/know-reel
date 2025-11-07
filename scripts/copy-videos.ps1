param(
  [string]$Downloads = "C:\Users\Majed Bashir\Downloads"
)

$ErrorActionPreference = 'Continue'

$destDir = Join-Path $PSScriptRoot '..\public\videos'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force -Path $destDir | Out-Null }

$map = @(
  @{ i = 1; name = 'Ponder Upon Jesus and Adam, Peace be upon them (1).mp4' }
  @{ i = 2; name = 'Secret Sins and Shame.mp4' }
  @{ i = 3; name = 'A World Full of Lies.mp4' }
  @{ i = 4; name = 'Be Thankful - Allah Will Give You More  #islamicvideo.mp4' }
  @{ i = 5; name = 'You Can Never Count the Favours of Allah  #shorts.mp4' }
  @{ i = 6; name = 'Remember Allah Often.mp4' }
  @{ i = 7; name = 'A Reminder Dear Muslims.mp4' }
  @{ i = 9; name = 'Signs of a Hypocrite.mp4' }
  @{ i = 10; name = 'Sharing News Responsibly.mp4' }
)

Write-Host "Copying videos from: $Downloads" -ForegroundColor Cyan

$copied = 0
foreach ($m in $map) {
  $src = Join-Path $Downloads $m.name
  $dst = Join-Path $destDir ("{0}.mp4" -f $m.i)
  if (Test-Path $src) {
    try {
      Copy-Item -LiteralPath $src -Destination $dst -Force
      Write-Host ("✔ Copied {0} -> {1}.mp4" -f $m.name, $m.i) -ForegroundColor Green
      $copied++
    } catch {
      Write-Warning ("Failed to copy {0}: {1}" -f $m.name, $_.Exception.Message)
    }
  } else {
    Write-Warning ("Missing: {0}" -f $src)
  }
}

Write-Host ""; Write-Host ("Copied {0}/{1} files." -f $copied, $map.Count) -ForegroundColor Yellow
Write-Host "Files now in public\\videos:" -ForegroundColor Cyan
Get-ChildItem -File $destDir | Format-Table Name, Length -AutoSize

Write-Host ""; Write-Host "Next: npm run dev, then open Home." -ForegroundColor Cyan
