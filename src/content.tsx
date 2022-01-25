import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@material-ui/core';
import { SwitchBtn } from "./atoms/SwitchBtn/SwitchBtn";
import { ProgressBtn } from './atoms/ProgressBtn/ProgressBtn';

import './contnet.css';

const Main = () => {

  const extractNum = (href: string, minusLen: number) => {
    const peace = href.split("/");
    return Number(peace[peace.length - minusLen]);
  };
  const extractLectureNum = (href: string) => extractNum(href, 1);

  const getHrefList = () => {
    const elements = Array.from(document.getElementsByClassName("lecture-container"));
    return elements.map(x => x.getElementsByTagName("a")[0].href);
  };

  const [acceptClickProgressBtn, setAcceptClickProgressBtn] = useState(true);
  const [checkedContinue, setCheckedContinue] = useState<boolean>(null);

  // 連続再生ボタンの状態を初期化
  const key = "checkedContinue";
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) localStorage.setItem(key, "false");
    const isChecked = item === "true";
    setCheckedContinue(isChecked);
  }, []);

  return <>
    <Box
      textAlign="center"
      position="fixed"
      bottom="30px"
      right="30px"
      bgcolor="#e8e8e8"
      borderRadius="14px"
      padding="20px"
      boxShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    >
      { checkedContinue !== null &&
        <SwitchBtn
          initChecked={ checkedContinue }
          onChange={ isActive => localStorage.setItem(key, String(isActive)) }
        /> }
      <ProgressBtn onClick={ async (dir) => {

        // 前の処理が終わるまでクリックさせない
        if (!acceptClickProgressBtn) return;
        setAcceptClickProgressBtn(false);

        let hrefList = getHrefList();

        const lectureNumbers = hrefList.map(x => extractLectureNum(x));
        const currentLectureNumber = extractLectureNum(location.href);

        const currentLectureIndex = lectureNumbers.indexOf(currentLectureNumber);
        const sign = dir === "next" ? 1 : -1;
        const nextLectureIndex = currentLectureIndex + sign;

        let nextHref = hrefList[nextLectureIndex];

        // 次の動画がアンロックされていなかったら...どうする
        if (nextHref === "") {
          console.warn("次の動画がアンロックされていません");
          setAcceptClickProgressBtn(true);
          return;
        }

        // 次の動画がなかったら次の回を読み込む
        if (nextHref === void(0)) {
          console.warn("レクチャーの端に到達しました");
  
          // アクティブなセクションを取得
          const sections = Array.from(document.getElementsByClassName("collapsible-header"));
          const excludeActiveSection
            = sections.map(x => x.getAttribute("class").match(/inactive-section/g));
          const activeSectionIndex = excludeActiveSection.indexOf(null);
          const btn
            = document.getElementsByClassName("section-title")[activeSectionIndex + sign] as HTMLElement;

          // 要素をクリックしないとアコーディオンが開かないのでクリックしてやる
          if (!btn) {
            console.warn("セクションの端に到達しました");
            setAcceptClickProgressBtn(true);
            return;
          }
          btn.click();

          // 次の回が読み込まれるまで待機
          // もっとスマートな方法求む
          while (true) {
            const isUpdated = JSON.stringify(hrefList) !== JSON.stringify(getHrefList());
            if (isUpdated) break;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          hrefList = getHrefList();
          nextHref = hrefList[sign === 1 ? 0 : hrefList.length - 1];
        }

        location.href = nextHref;
        setAcceptClickProgressBtn(true);
      } } />
    </Box>
  </>
};

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
