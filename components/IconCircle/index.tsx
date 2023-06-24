import { memo } from "react";

import styles from "../../styles/IconCircle.module.css";
type Props = {
  Icon: React.FC;
};
const Index: React.FC<Props> = ({ Icon }) => {
  return (
    <div className={styles.iconCircle}>
      <Icon />
    </div>
  );
};
export default memo(Index);
