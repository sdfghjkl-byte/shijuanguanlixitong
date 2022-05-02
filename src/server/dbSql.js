const sqlCommand = require("../server/sqlCommand");
const express = require("express");
let app = express();
const router = express.Router();
const query = require("./db");
const multer = require("multer");
var path = require("path");
const server = express();
let fs = require("fs");
let cors = require("cors");

app.use("/upload", express.static(path.resolve(__dirname, "./upload")));
var path = require("path");
app.use(cors());
// 解析word的中间件
// jie'kou'wen'jian

function dir(destination) {
  var upload = multer({
    storage: multer.diskStorage({
      destination: destination,
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    })
  });
  return upload;
}

var objMulter = multer({ dest: "./upload" }); //设置上传的的图片保存目录
server.use(objMulter.any());

// 上传：目前实现，点击发送请求，给后端 后端处理将结果文件路径传给前端
// 还需将文件 **存进数据库** 中，并 **响应到页面** 试卷列表

// 导出试卷    //下载：  点击 **让它访问文件路径** 就会自动下载 a标签

// 详情：当前试卷解析后的html

// multer的demo
// 上传文件接口

// 试卷上传
router.post(
  "/paper/upload",
  multer({
    //设置文件存储路径
    dest: "./upload"
  }).array("file", 10),
  function(req, res, next) {
    //这里10表示最大支持的文件上传数目
    let files = req.files;
    if (files.length === 0) {
      res.render("error", { message: "上传文件不能为空！" });
      return;
    } else {
      let fileInfos = [];
      for (var i in files) {
        let file = files[i];
        let fileInfo = {};
        fs.renameSync(
          "./upload/" + file.filename,
          "./upload/" + file.originalname
        ); //这里修改文件名。
        //获取文件基本信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        fileInfos.push(fileInfo);
      }
      // 设置响应类型及编码
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
      );
      res.end("success!");
    }
  }
);

// 试卷下载
router.use("/paper/download", function(req, res) {
  // let sql = sqlCommand.deleteUser;
  // let sqlParams = [req.body.userID]
  // query(sql, sqlParams, function (err, result){
  //   if(err){
  //     res.json({
  //       succeed: false,
  //       message: '删除失败'
  //     })
  //   } else{
  //     res.json({
  //       succeed: true
  //     })
  //   }
  //   res.end()
  // })
});

router.use(
  "/question/upload",
  dir("../../static/upload/question").single("file"),
  function(req, res) {
    if (req.file) {
      res.json({
        succeed: true,
        picture: req.file.originalname.substring(
          0,
          req.file.originalname.length - 4
        )
      });
      res.end();
    }
  }
);

router.use("/checkUser", function(req, res) {
  let sql;
  let sqlParams;
  if (!req.body.password) {
    sql = sqlCommand.selectUser;
    sqlParams = [req.body.userName];
  } else {
    sql = sqlCommand.selectUserAndPassword;
    sqlParams = [req.body.userName, req.body.password];
  }
  query(sql, sqlParams, function(err, result) {
    if (err || result.length === 0) {
      res.json({
        exist: false
      });
    } else {
      res.json({
        exist: true,
        userID: result[0].User_id,
        email: result[0].Email
      });
    }
    res.end();
  });
});

router.use("/user/addUser", function(req, res) {
  let sql = sqlCommand.insertUser;
  let sqlParams = [
    req.body.userName,
    req.body.userID,
    req.body.password,
    req.body.email
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      // console.log("执行了ma");
      res.json({
        succeed: false
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/user/deleteUser", function(req, res) {
  let sql = sqlCommand.deleteUser;
  let sqlParams = [req.body.userID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "删除失败"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/user/checkAdmin", function(req, res) {
  let sql = sqlCommand.checkAdmin;
  let sqlParams = [req.body.userID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "数据请求失败"
      });
      // }
      // else if(result.length === 0){
      //   res.json({
      //     succeed: false,
      //     message: '你不是系统管理员'
      //   })
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/user/modifyUserPower", function(req, res) {
  let sql = sqlCommand.checkModifyPower;
  let sqlParams = [req.body.userID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "修改失败"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/user/userModify", function(req, res) {
  let sql = sqlCommand.updateUser;
  let sqlParams = [
    req.body.name,
    req.body.password,
    req.body.email,
    req.body.userID,
    req.body.oldPass
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "密码错误"
      });
    } else if (result.affectedRows === 0) {
      res.json({
        succeed: false,
        message: "无法修改"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/checkModifyPower", function(req, res) {
  let sql = sqlCommand.checkModifyPower;
  let sqlParams = [req.body.userID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "无法查询权限"
      });
    } else if (result.length === 0) {
      res.json({
        succeed: false,
        message: "权限不足"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/user/userList", function(req, res) {
  let isHaveWhere = false;
  let sql = "SELECT SQL_CALC_FOUND_ROWS * FROM user ";
  let sqlParams = [];
  if (req.body.search !== "") {
    sql += "WHERE User_name LIKE ? ";
    isHaveWhere = true;
    sqlParams.push("%" + req.body.search + "%");
  }
  if (req.body.power !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
    } else {
      sql += "AND ";
    }
    sql += "Power=? ";
    sqlParams.push(req.body.power);
  }
  //12一页
  sql += "LIMIT ? , ? ;SELECT FOUND_ROWS() as count;";
  let page = parseInt(req.body.page);
  sqlParams.push(page * 17);
  sqlParams.push(17);
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      res.json({
        list: result[0],
        succeed: true,
        count: result[1][0].count
      });
    }
    res.end();
  });
});

router.use("/question/addQuestion", function(req, res) {
  let sql = sqlCommand.insertQuestion;
  let sqlParams = [
    req.body.type,
    req.body.describe,
    req.body.answer,
    req.body.bank,
    req.body.level,
    req.body.userID,
    req.body.picture,
    req.body.userID
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "提交失败"
      });
    } else if (result.affectedRows === 0) {
      res.json({
        succeed: false,
        message: "你的权限不足"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/question/modifyQuestion", function(req, res) {
  let sql = sqlCommand.updateQuestion;
  let sqlParams = [
    req.body.type,
    req.body.describe,
    req.body.answer,
    req.body.bank,
    req.body.level,
    req.body.userID,
    req.body.picture,
    req.body.questionID
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "提交失败"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/question/questionList", function(req, res) {
  let isHaveWhere = false;
  let sql = "SELECT SQL_CALC_FOUND_ROWS * FROM question ";
  let sqlParams = [];
  if (req.body.search !== "") {
    sql += "WHERE Describtion LIKE ? ";
    isHaveWhere = true;
    sqlParams.push("%" + req.body.search + "%");
  }
  if (req.body.bank !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
      isHaveWhere = true;
    } else {
      sql += "AND ";
    }
    sql += "Bank_name=? ";
    sqlParams.push(req.body.bank);
  }
  if (req.body.level !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
      isHaveWhere = true;
    } else {
      sql += "AND ";
    }
    sql += "Question_level=? ";
    sqlParams.push(req.body.level);
  }
  if (req.body.type !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
    } else {
      sql += "AND ";
    }
    sql += "Type=? ";
    sqlParams.push(req.body.type);
  }
  //12一页
  sql += "LIMIT ? , ? ;SELECT FOUND_ROWS() as count;";
  let page = parseInt(req.body.page);
  sqlParams.push(page * 17);
  sqlParams.push(17);
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      res.json({
        list: result[0],
        succeed: true,
        count: result[1][0].count
      });
    }
    res.end();
  });
});

router.use("/question/geQuestion", function(req, res) {
  let sql = sqlCommand.getQuestion;
  let sqlParams = [req.body.questionID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      res.json({
        question: result[0],
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/question/checkPower", function(req, res) {
  let sql = sqlCommand.checkQuestionPower;
  let sqlParams = [req.body.userID, req.body.questionID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "无法查询"
      });
    } else if (result.length === 0) {
      res.json({
        succeed: false,
        message: "权限不足"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/question/deleteQuestion", function(req, res) {
  let sql = sqlCommand.deleteQuestion;
  let sqlParams = [req.body.questionID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "删除失败"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/paper/addPaper", function(req, res) {
  let sql = sqlCommand.insertPaper;
  let sqlParams = [
    req.body.paperName,
    req.body.course,
    req.body.userID,
    req.body.level
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "提交失败"
      });
    } else {
      sql = sqlCommand.insertPaperQuestion;
      sqlParams = [];
      for (let x of req.body.questionIDs)
        sqlParams.push([result[1][0].last, parseInt(x)]);
      query(sql, [sqlParams], function(err, result) {
        if (err) {
          res.json({
            succeed: false,
            message: "提交失败"
          });
        } else {
          res.json({
            succeed: true,
            message: "提交成功"
          });
        }
        res.end();
      });
    }
  });
});

router.use("/paper/questionSelectList", function(req, res) {
  let sql = sqlCommand.getSelectedQuestion;
  let sqlParams = [req.body.selectIDs];
  query(sql, [sqlParams], function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "提交失败"
      });
    } else {
      res.json({
        list: result[0],
        succeed: true,
        count: result[1][0].count
      });
    }
    res.end();
  });
});

router.use("/paper/paperList", function(req, res) {
  let isHaveWhere = false;
  let sql = "SELECT SQL_CALC_FOUND_ROWS * FROM paper ";
  let sqlParams = [];
  if (req.body.search !== "") {
    sql += "WHERE Paper_name LIKE ? ";
    isHaveWhere = true;
    sqlParams.push("%" + req.body.search + "%");
  }
  if (req.body.bank !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
      isHaveWhere = true;
    } else {
      sql += "AND ";
    }
    sql += "Course=? ";
    sqlParams.push(req.body.bank);
  }
  if (req.body.level !== "") {
    if (!isHaveWhere) {
      sql += "WHERE ";
    } else {
      sql += "AND ";
    }
    sql += "Paper_level=? ";
    sqlParams.push(req.body.level);
  }
  //17一页
  sql += "LIMIT ? , ? ;SELECT FOUND_ROWS() as count;";
  let page = parseInt(req.body.page);
  sqlParams.push(page * 17);
  sqlParams.push(17);
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      res.json({
        list: result[0],
        succeed: true,
        count: result[1][0].count
      });
    }
    res.end();
  });
});

router.use("/paper/checkPower", function(req, res) {
  let sql = sqlCommand.checkPaperPower;
  let sqlParams = [req.body.userID, req.body.paperID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "无法查询数据库"
      });
    } else if (result.length === 0) {
      res.json({
        succeed: false,
        message: "权限不足"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/paper/deletePaper", function(req, res) {
  let sql = sqlCommand.deletePaper;
  let sqlParams = [req.body.paperID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "删除失败"
      });
    } else {
      res.json({
        succeed: true
      });
    }
    res.end();
  });
});

router.use("/paper/randPaper", function(req, res) {
  let sql =
    sqlCommand.randQuestion + sqlCommand.randQuestion + sqlCommand.randQuestion;
  let sqlParams = [
    "填空题",
    parseInt(req.body.fillNum),
    "选择题",
    parseInt(req.body.selectNum),
    "简答题",
    parseInt(req.body.stickNum)
  ];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "获取数据失败"
      });
    } else {
      res.json({
        succeed: true,
        fill: result[0],
        select: result[1],
        stick: result[2]
      });
    }
    res.end();
  });
});

router.use("/paper/getPaper", function(req, res) {
  let sql = sqlCommand.getPaper;
  let sqlParams = [req.body.paperID, req.body.paperID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "获取数据失败"
      });
    } else {
      res.json({
        succeed: true,
        paper: result[0][0],
        paperQuestionList: result[1]
      });
    }
    res.end();
  });
});

router.use("/paper/getPaperQuestion", function(req, res) {
  let sql = sqlCommand.getPaperQusetion;
  let sqlParams = [req.body.paperID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "获取数据失败"
      });
    } else {
      res.json({
        succeed: true,
        list: result
      });
    }
    res.end();
  });
});

router.use("/paper/modifyPaper", function(req, res) {
  let sql = sqlCommand.deletePaperQuestion;
  let sqlParams = [req.body.paperID];
  query(sql, sqlParams, function(err, result) {
    if (err) {
      res.json({
        succeed: false,
        message: "修改失败"
      });
    } else {
      sql = sqlCommand.insertPaperQuestion;
      sqlParams = [];
      for (let x of req.body.questionIDs)
        sqlParams.push([req.body.paperID, parseInt(x)]);
      query(sql, [sqlParams], function(err, result) {
        if (err) {
          res.json({
            succeed: false,
            message: "修改失败"
          });
        } else {
          res.json({
            succeed: true,
            message: "修改成功"
          });
        }
        res.end();
        return;
      });
    }
  });
});

router.use("/bank/getBank", function(req, res) {
  let sql = sqlCommand.getBanks;
  query(sql, {}, function(err, result) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      res.json({
        banks: result,
        succeed: true
      });
    }
    res.end();
  });
});

module.exports = router;
