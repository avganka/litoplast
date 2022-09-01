import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
  await imagemin(['src/img/*.{jpg,png}'], {
    destination: 'src/img',
    plugins: [
      imageminWebp({quality: 75})
    ]
  });
  console.log('Images optimized');
})();