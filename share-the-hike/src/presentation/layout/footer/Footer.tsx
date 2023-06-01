import css from "./Footer.module.css";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className="copyrights">©{year} Share the Hike</div>
      <div>Legal</div>
      <div>Page Information</div>
    </footer>
  );
};

export default Footer;
