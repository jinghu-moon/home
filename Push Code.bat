@echo off
echo ================================ Begin ================================
echo=
set Default_msg=���²���
set "Input_msg="
set "Submit_msg="
echo  (1) ��ȡԶ���ļ�
echo �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
echo ��ȡ��...
echo=
git pull
echo=
echo ��ȡ�ɹ���
echo=
echo  (2) �鿴�ļ�״̬
echo �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
git status
echo=
echo ����������������������������������������������
echo ��  untrack���½��ļ�  modified�����޸��ļ� ��
echo ��  staged���ݴ��ļ�   committed�����ύ�ļ���
echo ����������������������������������������������
echo=
echo  (3) �ύ�����ļ�
echo �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
echo ���� 0���ύ��ϢĬ��Ϊ���²��͡���������ύ��Ϣ�����ö��Ÿ�����
echo=
set /p Input_msg=�ύ��Ϣ��
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
echo  (4) ���θ������ݣ�
echo �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
set remain=%Submit_msg%
:loop
for /f "tokens=1* delims=��" %%a in ("%remain%") do (
	echo ��  %%a
	set remain=%%b
)
if defined remain goto :loop
echo=
echo ================================= End =================================
pause