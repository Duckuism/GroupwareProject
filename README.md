Opensource Groupware Funwork API Project.
==

> 이 프로젝트는 개발자의, 개발자에 의한, 개발자를 위한 그룹웨어 프로젝트 입니다.

- [Commit Message Guidelines](#commit-message-guidelines)
- [Development Guidelines](#development-guidelines)

## Commit Message Guidelines

### Commit Message Format
```
<유형>(<영역>): <제목>
<BLANK LINE>
<세부내용>
<BLANK LINE>
<기타>
```

#### 유형 (Type)
`https://github.com/angular/angular/blob/master/CONTRIBUTING.md`

* build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* docs: Documentation only changes
* feat: A new feature
* fix: A bug fix
* perf: A code change that improves performance
* refactor: A code change that neither fixes a bug nor adds a feature
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* test: Adding missing tests or correcting existing tests

#### 영역 (Scope)
특정 사항(기능)에 대한 수정일 경우 작성.

* approval : 전자결재
* organization : 조직도
* schedule : 일정관리
* mail : 메일
* board : 게시판

#### 제목 (Subject)
* 변경내용에 대한 요약

##### 영어로 작성할 경우 주의사항
* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

#### 세부내용 (Body)
* 해당 커밋에 대한 자세한 설명

#### 기타 (Footer)
https://help.github.com/articles/closing-issues-via-commit-messages/

## Development Guidelines

### 설정하기

#### 라이브러리 받기

```
npm install && npm install -g gulp
```

#### 서버 실행하기

```
npm run start:dev
```

#### 테스트 코드 실행하기

```
npm test
```