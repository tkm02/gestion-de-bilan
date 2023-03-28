const btn = document.getElementById("downloadBtn"); // Récupérer le bouton de téléchargement

btn.addEventListener("click", () => {
  // alert("vv")
const element = document.getElementById('table'); // Récupérer l'élément HTML à convertir en PDF
  var opt={
    margin: 1,
      filename: 'bilan.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  }
  html2pdf(element,opt)
});
