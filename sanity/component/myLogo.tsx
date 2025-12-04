/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

export const MyLogo = () => {
  return (
    <a href="/" style={{ display: 'inline-block' }}>
      <img
        src="/Overview/logocopy.png"
        alt="Brand Logo"
        style={{ 
          height: "30px", 
          width: "auto",  // Adjust as needed
          objectFit: "contain" // Keeps aspect ratio
        }} 
      />
    </a>
  );
};