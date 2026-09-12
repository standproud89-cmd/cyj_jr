[정이조 주니어 웹앱 - 배포는 이 폴더 하나만 올리면 됩니다]

배포 루트 구조:
  index.html                       ← 대문
  homeroom-notice.html             ← 담임 안내문
  syllabus-generator.html          ← 숙제 기한표
  next-semester-simulator.html     ← 다음학기 안내문자
  activity-tool/                   ← Activity Tool (빌드 완료된 정적 파일, 수정 불필요)
  activity-tool-source/            ← Activity Tool 원본 소스 (나중에 내용 수정할 때만 필요, 배포 안 해도 됨)

────────────────────────────────────
배포 방법 (딱 1번)
────────────────────────────────────
1. 이 zip을 풀어서 안의 내용물 전부를 새 GitHub 저장소 "루트"에 올리기
   (activity-tool-source 폴더도 같이 올려도 무방 — Vercel이 무시합니다)
2. Vercel에서 "Import Project" → 그 저장소 선택
3. Framework Preset: "Other" (빌드 명령 없음, Vercel이 파일을 그대로 서빙)
4. 배포 끝 — 대문에서 Activity Tool/Review Test/Halloween 눌러도 바로 연결됩니다.

────────────────────────────────────
나중에 Activity Tool 내용을 수정하고 싶을 때만
────────────────────────────────────
activity-tool-source 폴더에서 npm install → npm run build 하면
activity-tool-source/dist 폴더가 새로 생기는데, 그 안의 내용물로
배포 루트의 activity-tool/ 폴더를 통째로 교체하고 다시 올리면 됩니다.
(또는 그냥 저한테 다시 요청해주시면 제가 빌드해서 드릴게요.)
