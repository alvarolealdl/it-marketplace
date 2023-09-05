import logoFooter from '../../public/code-icon.png';

const Footer = () => {
  return (
    <footer className="d-flex align-items-center">
      <div className="d-flex flex-column p-3">
        <p className="mb-1">Powered by Álvaro Leal</p>
      </div>

      <img src={logoFooter} className="mktp-footer-logo" alt="logo" />
    </footer>
  );
}

export default Footer;
