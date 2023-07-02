import { Fragment } from "react";
import styles from "./ProblemList.module.css";

const ProblemList = (props) => {
  return (
    <Fragment>
      {props.userData.length > 0 ? (
        <div>
          <div className={styles.sortHeading}>
            Sorted by Total Problems Solved
          </div>
          <ul>
            {props.userData.map((item, index) => (
              <div key={index} className={styles.userCard}>
                <div
                  className={styles.userName}
                  style={{
                    backgroundColor: "#9bcdd2",
                    border: "1px solid #000000",
                    color: "black",
                  }}
                >
                  {item[0]}
                </div>
                <ul className={styles.categoriesList}>
                  <li className={styles.categoryItem}>
                    <span
                      className={`${styles.categoryLabel} ${styles.allLabel}`}
                    >
                      ALL :
                    </span>
                    <span
                      className={`${styles.categoryCount} ${styles.allCount}`}
                    >
                      {item[1][0]}
                    </span>
                  </li>
                  <li className={`${styles.categoryItem} ${styles.easy}`}>
                    <span
                      className={`${styles.categoryLabel} ${styles.easyLabel}`}
                    >
                      EASY:
                    </span>
                    <span className={styles.categoryCount}>{item[1][1]}</span>
                  </li>
                  <li className={`${styles.categoryItem} ${styles.medium}`}>
                    <span
                      className={`${styles.categoryLabel} ${styles.mediumLabel}`}
                    >
                      MEDIUM:
                    </span>
                    <span className={styles.categoryCount}>{item[1][2]}</span>
                  </li>
                  <li className={`${styles.categoryItem} ${styles.hard}`}>
                    <span
                      className={`${styles.categoryLabel} ${styles.hardLabel}`}
                    >
                      HARD:
                    </span>
                    <span className={styles.categoryCount}>{item[1][3]}</span>
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className="app__message">The list will appear here</p>
      )}
    </Fragment>
  );
};

export default ProblemList;
