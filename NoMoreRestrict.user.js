// ==UserScript==
// @namespace         https://github.com/WCY-dt
// @name              🚫NoMoreRestrict🚫
// @name:en           🚫NoMoreRestrict🚫
// @name:zh-CN        🚫限制你妹🚫
// @description       Get rid of the annoying restrictions on websites， including right-click, text selection, copy, drag, save, etc.
// @description:en    Get rid of the annoying restrictions on websites， including right-click, text selection, copy, drag, save, etc.
// @description:zh-CN 摆脱网站上各种沙壁限制，包括右键、文本选择、复制、拖动、保存等
// @version           1.0.0
// @homepageURL       https://github.com/WCY-dt/NoMoreRestrict
// @supportURL        https://github.com/WCY-dt/NoMoreRestrict/issues/new?assignees=WCY-dt&labels=help+wanted
// @updateURL         https://raw.githubusercontent.com/WCY-dt/NoMoreRestrict/main/NoMoreRestrict.user.js
// @downloadURL       https://raw.githubusercontent.com/WCY-dt/NoMoreRestrict/main/NoMoreRestrict.user.js
// @author            Ch3nyang
// @copyright         2024, Ch3nyang
// @license           MIT
// @match             *://*/*
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEzLDlIMTguNUwxMywzLjVWOU02LDJIMTRMMjAsOFYyMEEyLDIgMCAwLDEgMTgsMjJINkM0Ljg5LDIyIDQsMjEuMSA0LDIwVjRDNCwyLjg5IDQuODksMiA2LDJNMTAuNSwxMUM4LDExIDYsMTMgNiwxNS41QzYsMTggOCwyMCAxMC41LDIwQzEzLDIwIDE1LDE4IDE1LDE1LjVDMTUsMTMgMTMsMTEgMTAuNSwxMU0xMC41LDEyLjVBMywzIDAgMCwxIDEzLjUsMTUuNUMxMy41LDE2LjA2IDEzLjM1LDE2LjU4IDEzLjA4LDE3TDksMTIuOTJDOS40MiwxMi42NSA5Ljk0LDEyLjUgMTAuNSwxMi41TTcuNSwxNS41QzcuNSwxNC45NCA3LjY1LDE0LjQyIDcuOTIsMTRMMTIsMTguMDhDMTEuNTgsMTguMzUgMTEuMDYsMTguNSAxMC41LDE4LjVBMywzIDAgMCwxIDcuNSwxNS41WiIgZmlsbD0iI2NjMDAwMCIgLz48L3N2Zz4=
// @require           https://code.jquery.com/jquery-3.7.1.min.js
// @grant             GM_addStyle
// ==/UserScript==

const $ = window.jQuery.noConflict(true);

(function () {
    'use strict';

    // Block the restriction of right-click
    document.addEventListener('contextmenu', function (event) {
        event.stopPropagation();
    }, true);

    // Block the restriction of copy
    document.addEventListener('copy', function (event) {
        event.stopPropagation();
    }, true);

    // Block the restriction of select
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '* { user-select: auto !important; }';
    document.head.appendChild(style);

    // Block the restriction of drag
    document.addEventListener('dragstart', function (event) {
        event.stopPropagation();
    }, true);

    // Block the restriction of save
    document.addEventListener('contextmenu', function (event) {
        if (['IMG', 'VIDEO', 'AUDIO'].includes(event.target.nodeName)) {
            event.preventDefault();
        }
    });

    // Handle the site-specific restrictions
    switch (window.location.hostname) {
        case 'blog.csdn.net':
            handleSiteCsdn();
            break;
        case 'wenku.baidu.com':
            handleSiteBaiduwenku();
            break;
        default:
            break;
    }
})();

function handleSiteCsdn() {
    // Modify the copy button
    $('code>div').each(function () {
        const copyButton = $(this);
        const codeBlock = copyButton.closest('code');
        const preBlock = codeBlock.parent();

        // always show copyBotton
        copyButton.css('display', 'block');

        // copy code to clipboard
        copyButton.on('click', function () {
            const code = codeBlock.text();
            navigator.clipboard.writeText(code);
        });

        // change the title of copyButton
        copyButton.attr('data-title', '直接复制');

        // delete `data-report-click` attribute
        copyButton.removeAttr('data-report-click');

        // delete `onclick` attribute of codeBlock
        codeBlock.removeAttr('onclick');
    });
}

function handleSiteBaiduwenku() {
    setTimeout(() => {
        // auto click the `show all` button after waiting for 3 seconds
        const showAllButton = $('.load-more-link .text-arrow-wrap');
        console.log(showAllButton);
        if (showAllButton.length > 0) {
            showAllButton.click();
        }
    }, 3000); // Wait for 3000 milliseconds (3 seconds) before executing the code inside setTimeout
}