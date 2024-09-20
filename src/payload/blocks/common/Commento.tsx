import { useEffect } from 'react'

// Extend the global window object to include Commento
declare global {
  interface Window {
    Commento: {
      start: () => void
    }
  }
}

const Commento = () => {
  useEffect(() => {
    if (!document.getElementById('commento-script')) {
      const script = document.createElement('script')
      script.src = 'https://cdn.commento.io/js/commento.js'
      script.defer = true
      script.id = 'commento-script'
      script.setAttribute('data-css-override', '/commento-custom.css')
      document.body.appendChild(script)

      // Ensure Commento is initialized once the script is loaded
      script.onload = () => {
        if (window.Commento) {
          window.Commento.start()
        }
      }
    } else {
      // Reinitialize Commento if the script is already loaded
      if (window.Commento) {
        window.Commento.start()
      }
    }
  }, [])

  return <div id='commento'></div>
}

export default Commento
