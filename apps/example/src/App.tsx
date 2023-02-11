//@ts-nocheck
import "antd/dist/antd.css";
//此Demo引入报错
import { Demo,Guide } from "@packages/components";
import Button from "antd/es/button";
import styles from "./index.scss";
export default function App() {
  return (
    <div>
      <Demo />
      <Guide />
      <Button type="primary">按钮</Button>
      <p className={styles.color}>这应该是红色的字儿</p>
    </div>
  );
}
