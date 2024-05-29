import { LayoutBaseModel } from "@/models";
import styles from "./layout.module.css";

const Layout: LayoutBaseModel = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.child}>{children}</div>
    </div>
  );
};

export default Layout;
