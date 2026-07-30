import { useCallback, useState } from 'react'

/**
 * Turns a piece of the page into a PNG the visitor can keep.
 *
 * The renderer is pulled in only when someone actually presses download, so it
 * costs nothing on load. Everything it needs — the typefaces, any photograph —
 * is served from this origin, so the canvas is never tainted.
 *
 * Anything marked `data-no-capture` is left out of the picture (the download
 * control itself, for one).
 */
export function useDownloadImage() {
  const [state, setState] = useState('idle') // idle | working | done | failed

  const download = useCallback(async (node, filename) => {
    if (!node || state === 'working') return
    setState('working')

    try {
      const { toPng } = await import('html-to-image')

      const dataUrl = await toPng(node, {
        // 2× so the certificate is worth printing, not just viewing
        pixelRatio: 2,
        cacheBust: true,
        // No backgroundColor: it would paint over the node's own background,
        // and the certificate is a sheet of paper.
        filter: (element) => !element.dataset?.noCapture,
      })

      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()

      setState('done')
      window.setTimeout(() => setState('idle'), 2600)
    } catch {
      setState('failed')
      window.setTimeout(() => setState('idle'), 3200)
    }
  }, [state])

  return { download, state }
}
