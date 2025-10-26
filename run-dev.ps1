param(
  [switch]$Open,
  [int]$Port
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

if (-not (Test-Path node_modules)) {
  Write-Host 'Installing dependencies...'
  npm install | Out-Host
}

$argsList = @('run','dev')
if ($Open) { $argsList += '--' ; $argsList += '--open' }
if ($Port) { if (-not $Open) { $argsList += '--' } ; $argsList += '--port'; $argsList += $Port }

Write-Host 'Starting dev server...'
npm @argsList | Out-Host

