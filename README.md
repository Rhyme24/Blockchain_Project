# 目录 
- [选题背景和依据](#background)  
- [使用说明](#usage)  
- [测试](#test)  

--------------------- 

<span id="fourteen">
   
# 选题背景和依据

</span>

&emsp;&emsp;学生综合评测是每学年评奖学金的重要依据，也是每年都要完成的重要任务。现在的综合测评方式为参与测评的学生自己提供公益时证明和加分证明，将证明文件打包后发送给班级评分小组，评分小组对各人的证明进行审查汇总，各班再将汇总情况提交到年级，再次进行评分的统一与修正。

&emsp;&emsp;这其实是一个相对繁琐的过程，首先，活动组织者要向上级申请活动证明，申请必须在上级的工作时间内完成，一旦错过便无法获得证明。然后，组织者要将证明分发给参与活动的学生，学生在获得证明后要细心保管，因为一旦丢失，便无法进行测评。由于活动组织单位不同，证明文件的形式是不统一的，有纸质版，有电子版，电子版的格式又有多种可能。证明形式的不统一使得评审小组必须将大量证明文件一一过目，并根据活动给予相应的加分，评审小组对加分的多少往往也会产生分歧。由于综合测评总是放到新学期初进行，时长较短，工作量其实是巨大的，而这些工作实际上在活动结束时就可以着手展开，没有必要全部堆到学期初。总之，如今的综合评测方式是存在不少弊端的，因此我想通过区块链实现一个综合评测系统来协助完成该工作。

---

<span id="usage">
   
# 使用说明 

</span>

* 环境：Windows10
* 工具：
    * Node.js v10.14.2
    * Truffle v5.0.0
    * EthereumJS TestRPC v6.0.3 (ganache-core: 2.0.2)
* 启动：
    * 打开cmd窗口，启动TestRPC：`testrpc`
    * 另开一个cmd窗口，进入项目文件夹，部署智能合约：`truffle migrate`
    * 启动服务：`npm run dev`
    * 打开浏览器，输入http://localhost:8080/即可使用软件

&emsp;&emsp;打开网页，进入管理员界面。该界面中有七个导航选项，分别对应添加学生，加分，加公益时，添加活动，截止活动，通过申请和切换用户功能，点击可进行切换。

&emsp;&emsp;添加学生面板中，输入要添加的学生姓名与学号，点击添加按钮，就能将该学生添加到学生列表中，系统会为其自动生成一个区块链地址。

![此处输入图片的描述][1]

&emsp;&emsp;加分面板中，输入加分数与学生地址，就能给该地址对应的学生添加综测分数。

![此处输入图片的描述][2]

&emsp;&emsp;加公益时面板中，输入要添加的公益时数与学生地址，就能给该地址对应的学生添加公益时。

![此处输入图片的描述][3]

&emsp;&emsp;发布活动面板中，输入活动名，详情，加分数与公益时数，便可发布该活动，系统会自动为活动生成编号，并将该活动将显示在活动列表中，供所有用户查看。

![此处输入图片的描述][4]

&emsp;&emsp;截止活动面板中，输入活动编号，便可将该编号对应的活动变为截止状态，参加了该活动的学生将获得该活动提供的综测加分与公益时数。

![此处输入图片的描述][5]

&emsp;&emsp;通过申请面板中，输入活动编号，便可使该编号对应的活动通过审核，学生申请的综测与公益时数将转到学生的账户中。

![此处输入图片的描述][6]

&emsp;&emsp;切换用户面板中，输入用户地址，便可切换到该用户。可在页面右上角查看当前用户身份。

![此处输入图片的描述][7]

&emsp;&emsp;页面下拉，将看到三张表格，分别是学生综测分数，学校发布活动及学生申请活动的公示，用以公开综测信息，供所有用户查看。

![此处输入图片的描述][8]

![此处输入图片的描述][9]

![此处输入图片的描述][10]

&emsp;&emsp;切换的用户为学生时，进入学生界面，该界面有三个导航选项，分别对应参加活动，申请加分和切换用户功能，点击可进行切换。
&emsp;&emsp;参加活动面板中，输入活动编号，便可参加该活动。

![此处输入图片的描述][11]

&emsp;&emsp;申请加分面板中，输入加分项，加分数与公益时数，便能提交加分申请，系统会自动为该申请设置编号，并将其添加到申请活动列表中，供所有用户查看。

![此处输入图片的描述][12]

&emsp;&emsp;学生界面中切换用户面板与下拉显示的三个表格皆与管理员面板相同。

---

<span id="test">
   
# 测试 

</span>

* 管理员特权：
    * 添加学生
&emsp;&emsp;在添加学生面板输入姓名和学号，点击添加，成功添加到学生列表中。

    ![此处输入图片的描述][13]

    * 加分
&emsp;&emsp;在加分面板中，输入分数和学生地址，学生列表中对应学生的综测分数成功增加。

    ![此处输入图片的描述][14]

    * 加公益时
&emsp;&emsp;在加分面板中，输入公益时和学生地址，学生列表中对应学生的公益时成功增加。

    ![此处输入图片的描述][15]

* 切换用户
&emsp;&emsp;进入切换用户面板，输入地址，点击切换按钮，便可切换为该用户，页面右上角将更新用户身份。

    ![此处输入图片的描述][16]

* 校内活动发布、参与与完成
    * 管理员添加活动
&emsp;&emsp;在发布活动面板中输入活动名、详情、加分数和公益时，点击添加按钮，活动成功添加到列表中。

    ![此处输入图片的描述][17]
    
    ![此处输入图片的描述][18]

    * 学生参加活动
&emsp;&emsp;学生在参加活动面板输入活动编号，点击参加按钮，即可参加该活动。

    ![此处输入图片的描述][19]

    * 管理员截止活动
&emsp;&emsp;管理员在截止活动面板输入活动编号，点击截止按钮。参加了该活动的学生成功获得综测分数与公益时，该活动的状态变为“已截止”。

    ![此处输入图片的描述][20]
    
    ![此处输入图片的描述][21]
    
    ![此处输入图片的描述][22]

* 校外活动申请与审核
    * 学生申请加分
&emsp;&emsp;学生进入申请加分面板，输入加分项，加分数和公益时，点击申请按钮，申请的加分项成功添加到列表中。

    ![此处输入图片的描述][23]
    
    ![此处输入图片的描述][24]

    * 管理员审核
&emsp;&emsp;管理员进入通过申请面板，输入活动编号，点击通过按钮。该活动状态变为已通过，申请者成功获得申请的加分数和公益时。

    ![此处输入图片的描述][25]
    
    ![此处输入图片的描述][26]
    
    ![此处输入图片的描述][27]



  [1]: https://i.loli.net/2018/12/31/5c29c2e2e2596.png
  [2]: https://i.loli.net/2018/12/31/5c29c308d8ca9.png
  [3]: https://i.loli.net/2018/12/31/5c29c3364c904.png
  [4]: https://i.loli.net/2018/12/31/5c29c37107c10.png
  [5]: https://i.loli.net/2018/12/31/5c29c3ad6ca59.png
  [6]: https://i.loli.net/2018/12/31/5c29c3c94443d.png
  [7]: https://i.loli.net/2018/12/31/5c29c3e1844bb.png
  [8]: https://i.loli.net/2018/12/31/5c29c409a7846.png
  [9]: https://i.loli.net/2018/12/31/5c29c416c6ff8.png
  [10]: https://i.loli.net/2018/12/31/5c29c42679c67.png
  [11]: https://i.loli.net/2018/12/31/5c29c441a0216.png
  [12]: https://i.loli.net/2018/12/31/5c29c461d5f77.png
  [13]: https://i.loli.net/2018/12/31/5c29c5c74c87e.png
  [14]: https://i.loli.net/2018/12/31/5c29c5ff213d6.png
  [15]: https://i.loli.net/2018/12/31/5c29c621f21d8.png
  [16]: https://i.loli.net/2018/12/31/5c29c641c15f5.png
  [17]: https://i.loli.net/2018/12/31/5c29c6685126f.png
  [18]: https://i.loli.net/2018/12/31/5c29c674605fd.png
  [19]: https://i.loli.net/2018/12/31/5c29c6920e38f.png
  [20]: https://i.loli.net/2018/12/31/5c29c6b0cbaf8.png
  [21]: https://i.loli.net/2018/12/31/5c29c6c99f112.png
  [22]: https://i.loli.net/2018/12/31/5c29c6c99f112.png
  [23]: https://i.loli.net/2018/12/31/5c29c6eac03c7.png
  [24]: https://i.loli.net/2018/12/31/5c29c6f9a601c.png
  [25]: https://i.loli.net/2018/12/31/5c29c7151689d.png
  [26]: https://i.loli.net/2018/12/31/5c29c72112997.png
  [27]: https://i.loli.net/2018/12/31/5c29c72c7a82a.png
