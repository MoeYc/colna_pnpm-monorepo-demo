import { Image, Result } from 'antd'
import styles from './index.module.scss'
const Guide = () => {
  return (
    <Result
      className={styles.welcomeContainer}
      icon={
        <Image
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          preview={false}
        />
      }
      title="欢迎使用PnpmMonorepo-App"
      subTitle="Welcome to the PnpmMonorepo-App"
    />
  )
}

export default Guide
