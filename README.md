# AboutMeCMD

## 목차
1. <a href="#intro">소개</a>
2. <a href="#use">사용법</a>
3. <a href="#dev">개발일지</a>

<a name="intro"></a>
## 소개
<img src="img/aboutMeCmd_img.png"></img>
cmd 스타일로 자신을 소개할 수 있는 Phaser 기반 웹 어플리케이션입니다. 

<a name="use"></a>
## 사용법
자신의 깃블로그에 삽입하기 위해서는 해당 레파지토리를 clone한 후, `codeSrcFull` 폴더 > `cmdGame` 폴더 > `assets`폴더와 `index.html`을 다운로드 받습니다.  
<br>
수정할 수 있는 사항은 다음과 같습니다.

### 로고 이미지 변경
cmd 상단의 로고를 변경할 수 있습니다.
1. 600x20 사이즈의 로고 이미지를 준비합니다.
2. `assets` > `images` 의 `logo.jpg`를 삭제 후 준비한 이미지를 추가합니다.
3. `main.js`의 `logo_img_context` 변수에서 이미지 경로를 수정합니다.

### input box 변경
cmd 하단의 input Box를 변경할 수 있습니다. 기존 코드는 cmd창과 같은 색으로 지정되어있습니다.
1. 600x40 사이즈의 input box 이미지를 준비합니다.
2. `assets` > `images`의 `cmdGameInputBox.jpg`를 삭제 후 준비한 이미지를 추가합니다.
3. `main.js`의 `inputBox_context` 변수에서 이미지 경로를 수정합니다.

### 사용자 지정 가능 변수 변경
1. `main.js`의 `start_message` : cmd를 시작하면 나오는 "HELLO!" 문구를 변경할 수 있습니다.
2. `main.js`의 `start_message_output` : 위의 문구에 대한 응답 메세지를 변경할 수 있습니다.
3. `main.js`의 `fail_load_logo_message` : 로고 이미지 로드에 실패할 경우 우측 상단에 삽입되는 메세지를 변경할 수 있습니다.
4. `main.js`의 `cmd_backgroundColor` : cmd 배경 색상을 변경할 수 있습니다.

### 명령어 추가 및 변경
`main.js`의 command function에서 명령어와 이에 대한 응답 메세지를 추가하거나 수정할 수 있습니다.  

<a name="dev"></a>
### 개발일지

