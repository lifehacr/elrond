import { useEffect } from 'react'

const Commento = () => {
  useEffect(() => {
    // Check if Commento script is already loaded to avoid re-loading it
    if (!document.getElementById('commento-script')) {
      const script = document.createElement('script')
      script.src = 'https://cdn.commento.io/js/commento.js'
      script.defer = true
      script.setAttribute('data-css-override', '/commento-custom.css')
      script.id = 'commento-script' // Give the script an ID to avoid duplication
      document.body.appendChild(script)
    }
  }, []) // Only run this once when the component mounts

  return <div id='commento'></div> // This is where the Commento widget will render
}

export default Commento
