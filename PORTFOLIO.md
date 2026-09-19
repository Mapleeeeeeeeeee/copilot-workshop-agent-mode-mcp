![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

![Agent Mode](https://img.shields.io/badge/Agent_Mode-已實作-1E2761?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-已整合-1E2761?style=flat-square)
![Agentic Workflow](https://img.shields.io/badge/Agentic_Workflow-已建立-1E2761?style=flat-square)

# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊完成的純前端待辦清單 Web App，支援離線使用與瀏覽器端資料保存。

## 線上展示

[開啟 GitHub Pages](https://mapleeeeeeeeeee.github.io/copilot-workshop-agent-mode-mcp/)

## 功能

- 新增待辦事項，空白內容不會送出
- 勾選標記完成或取消完成
- 刪除單筆待辦事項
- 一次清除所有已完成項目，並在刪除前要求確認
- 篩選檢視：全部、未完成、已完成
- 篩選結果為空時顯示對應提示
- 顯示整體未完成項目數量，不受目前篩選條件影響
- 切換淺色與深色模式
- 記住使用者的主題偏好；未手動設定時跟隨作業系統設定
- 使用 `localStorage` 保存待辦事項與主題偏好
- 支援手機螢幕

## 技術

| 項目 | 內容 |
| :--- | :--- |
| 前端 | HTML5、CSS3、原生 JavaScript |
| 框架與套件 | 無框架、無套件、無 `package.json` |
| 外部資源 | 無外部 CDN，可離線運作 |
| 資料儲存 | 瀏覽器 `localStorage` |
| 主題切換 | CSS 變數與 `prefers-color-scheme` |
| 部署 | GitHub Pages 靜態託管 |

檔案結構：

```text
index.html    # 版面結構
styles.css    # 樣式與深淺色主題
app.js        # 互動邏輯與資料存取
```

## 開發方式

這個專案使用 GitHub Copilot Agent Mode 協助建立與修改前端檔案，並透過 MCP 連接 Microsoft Learn 與 GitHub 工具。

- Agent Mode：依需求建立與修改 HTML、CSS、JavaScript
- MCP：查詢 Microsoft Learn 文件、讀取 GitHub issue 與建立 Pull Request
- Agentic Workflow：使用 `.github/prompts/fix-issue.prompt.md` 將讀取 issue、提出計畫、建立分支、修改、驗證、提交與開 PR 串成固定流程
- GitHub Pages：將根目錄的靜態 `index.html` 發布為公開網站

## 我學到什麼

1. Agent Mode 會根據目標自行檢查檔案、修改程式並執行驗證。
2. 清楚的專案規範能讓多檔案修改維持一致的技術限制與程式風格。
3. MCP 能讓 AI 直接查詢官方文件、讀取 issue 並協助建立 Pull Request。
4. Git 分支、rebase 與 Pull Request 能讓功能修改保持可追蹤，也能處理分支衝突。
5. 把重複的修 issue 流程寫成 prompt，可以讓後續工作更一致。

## 授權

MIT
