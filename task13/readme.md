# 学习Git笔记
## 分支管理
### 创建与合并分支
#### 查看分支：`git branch`
#### 创建分支：`git branch <name>`
#### 切换分支：`git checkout <name>`
#### 创建+切换分支：`git checkout -b <name>`
#### 合并某分支到当前分支：`git merge <name>`
#### 删除分支：`git branch -d <name>`
### 解决冲动
master分支和name分支各自都分别有新的提交，这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并会有冲突.

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
#### 最后，查看分支合并图：`git log --graph --pretty=oneline --abbrev-commit`

###分支管理策略
先创建新分支，再add和commit，最后切换到主分支master，合并分支时要先禁用“Fast forward模式”，命令：
`git merge --no-ff -m "merge with no-ff" dev`

***合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。***
