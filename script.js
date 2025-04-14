document.getElementById('badgeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  generateBadge();
});

function generateBadge() {
  const name = document.getElementById('name').value;
  const fonction = document.getElementById('fonction').value;
  const promo = document.getElementById('promo').value;
  const photoInput = document.getElementById('photo');
  const canvas = document.getElementById('badgeCanvas');
  const ctx = canvas.getContext('2d');

  const bg = new Image();
  bg.src = 'badge_background.png';

  bg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    if (photoInput.files && photoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const photo = new Image();
        photo.src = e.target.result;
        photo.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(300, 290, 85, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(photo, 215, 205, 170, 170);
          ctx.restore();

          ctx.fillStyle = '#e91e63';
          ctx.font = 'bold 22px Rajdhani';
          ctx.textAlign = 'center';
          ctx.fillText(name, 300, 410);
          ctx.fillText(fonction, 300, 440);
          ctx.fillText(`Prom: ${promo}`, 300, 470);

          document.getElementById('download-btn').style.display = 'inline-block';
        };
      };
      reader.readAsDataURL(photoInput.files[0]);
    }
  };
}

document.getElementById('download-btn').addEventListener('click', () => {
  const canvas = document.getElementById('badgeCanvas');
  const link = document.createElement('a');
  link.download = 'badge.png';
  link.href = canvas.toDataURL();
  link.click();
});
