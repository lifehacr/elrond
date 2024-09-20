import { useEffect } from 'react'

// Extend the window object to include Commento
declare global {
  interface Window {
    Commento: {
      start: (config: { id: string; site_id: string }) => void
    }
  }
}

const Commento = () => {
  useEffect(() => {
    // Ensure the script is added to the DOM only once
    const script = document.createElement('script')
    script.src = 'https://cdn.commento.io/js/commento.js'
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      // Check if the Commento script has loaded before calling start
      if (window.Commento) {
        window.Commento.start({
          id: 'commento',
          site_id: 'https://prod-emerald-test-production.up.railway.app/',
        })
      }
    }

    return () => {
      // Clean up script if needed on unmount
      document.body.removeChild(script)
    }
  }, [])

  return <div id='commento'></div>
}

export default Commento
