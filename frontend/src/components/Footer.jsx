import "../css/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} 🎬 MovieApp. Made with ❤️ by Hasnat Rafi Uddin using TMDB API.
      </p>
    </footer>
  );
}

export default Footer;
