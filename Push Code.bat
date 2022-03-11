@echo off
echo ================================ Begin ================================
echo=
set Default_msg=更新博客
set "Input_msg="
set "Submit_msg="
echo  (1) 拉取远端文件
echo ═══════════════════════════════════════════════════
echo 拉取中...
echo=
git pull
echo=
echo 拉取成功！
echo=
echo  (2) 查看文件状态
echo ═══════════════════════════════════════════════════
git status
echo=
echo ┌—————————————————————┐
echo │  untrack：新建文件  modified：已修改文件 │
echo │  staged：暂存文件   committed：已提交文件│
echo └—————————————————————┘
echo=
echo  (3) 提交本地文件
echo ═══════════════════════════════════════════════════
echo 输入 0，提交信息默认为更新博客。输入多条提交信息，请用逗号隔开。
echo=
set /p Input_msg=提交信息：
echo=
if %Input_msg% equ 0 (
	set Submit_msg=%Default_msg%
) else (
	set Submit_msg=%Input_msg%
)
git add .
git commit -m "%Submit_msg%"
git push
echo=
echo  (4) 本次更新内容：
echo ═══════════════════════════════════════════════════
set remain=%Submit_msg%
:loop
for /f "tokens=1* delims=，" %%a in ("%remain%") do (
	echo ├  %%a
	set remain=%%b
)
if defined remain goto :loop
echo=
echo ================================= End =================================
pause