import userModel from "../../../../database/models/user.js";
import charityModel from "../../../../database/models/charity.js";
import { generateToken, verifyToken } from '../../../utils/GenerateAndVerifyToken.js'
import { compare, hash } from "../../../utils/HashAndCompare.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import sendEmail from '../../../utils/email.js'
import adminModel from "../../../../database/models/admin.js";
import { nanoid ,customAlphabet} from 'nanoid';



export const usersignup=asyncHandler(
    async (req,res,next)=>{
        const {name,email,password,gender,phone,job,country}=req.body;
        const role='user'
        //check email exist
    
        if (await userModel.findOne({ email: email.toLowerCase() }) || await charityModel.findOne({ email: email.toLowerCase() }) || await adminModel.findOne({ email: email.toLowerCase() })) {
            return next(new Error("Email exist", { cause: 409 }))
        }
      
        //sendEmail()
        const nanoId = customAlphabet('123456789', 4)
        const forgetCode = nanoId()
        const html = `<html>
        <head>
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass * {
            line-height: 100%;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width: 480px) {
            @-ms-viewport {
              width: 320px;
            }
            @viewport {
              width: 320px;
            }
          }
        </style>
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
          rel="stylesheet"
          type="text/css"
        />
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (min-width: 480px) {
            .mj-column-per-100,
            * [aria-labelledby="mj-column-per-100"] {
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body style="background: #f9f9f9">
        <div style="background-color: #f9f9f9">
          <style type="text/css">
            html,
            body,
            * {
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            }
            a {
              color: #1eb0f4;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 40px 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                word-break: break-word;
                                font-size: 0px;
                                padding: 0px;
                              "
                              align="center"
                            >
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                style="border-collapse: collapse; border-spacing: 0px"
                                align="center"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td style="width: 138px">
                                     
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <div
              style="
                margin: 0px auto;
                max-width: 640px;
                background: #7289da
                  url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                  top center / cover no-repeat;
              "
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-size: 0px;
                  width: 100%;
                  background: #7289da
                    url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                    top center / cover no-repeat;
                "
                align="center"
                border="0"
                background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 57px;
                      "
                    >
                      <div
                        style="
                          cursor: auto;
                          color: white;
                          font-family: Whitney, Helvetica Neue, Helvetica, Arial,
                            Lucida Grande, sans-serif;
                          font-size: 36px;
                          font-weight: 600;
                          line-height: 36px;
                          text-align: center;
                        "
                      >
                        Welcome to Athar!
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="font-size: 0px; width: 100%; background: #ffffff"
                align="center"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 40px 70px;
                      "
                    >
                      <div
                        aria-labelledby="mj-column-per-100"
                        class="mj-column-per-100 outlook-group-fix"
                        style="
                          vertical-align: top;
                          display: inline-block;
                          direction: ltr;
                          font-size: 13px;
                          text-align: left;
                          width: 100%;
                        "
                      >
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  word-break: break-word;
                                  font-size: 0px;
                                  padding: 0px 0px 20px;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    cursor: auto;
                                    color: #737f8d;
                                    font-family: Whitney, Helvetica Neue, Helvetica,
                                      Arial, Lucida Grande, sans-serif;
                                    font-size: 16px;
                                    line-height: 24px;
                                    text-align: left;
                                  "
                                >
                                  <p>
                                    <img
                                      src="https://res.cloudinary.com/dfzbcjlal/image/upload/v1686483249/vbptqaqwrfnoiyuelgbk.png"
                                      alt="Party Wumpus"
                                      title="None"
                                      width="500"
                                      style="height: auto"
                                    />
                                  </p>
      
                                  <h2
                                    style="
                                      font-family: Whitney, Helvetica Neue, Helvetica,
                                        Arial, Lucida Grande, sans-serif;
                                      font-weight: 500;
                                      font-size: 20px;
                                      color: #4f545c;
                                      letter-spacing: 0.27px;
                                    "
                                  >
                                    Hey ${name},
                                  </h2>
                                  <p>
                                    Wowwee! Thanks for registering an account with
                                    Athar!
                                  </p>
                                  <p>
                                    Before we get started, we'll need to verify your
                                    email.
                                  </p>
                                  <br>
                                  <p>This is your verification code :</p>
                                </div>
                                <br> <br>
                            <button style="
                                      border: none;
                                      border-radius: 3px;
                                      color: white;
                                      cursor: auto;
                                      padding: 15px 19px;
                                      position: relative;
                                      left: 40%;
                                      /* align:center; */
                                      /* valign:middle; */
                                      background-color:#7289DA;
                                    "
                                    >${forgetCode}
                                  </button>
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]>
              </td></tr></table>
              <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td style="word-break: break-word; font-size: 0px">
                              <div style="font-size: 1px; line-height: 12px">
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              margin: 0 auto;
              max-width: 640px;
              background: #ffffff;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <table
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: #ffffff"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`
 
    if (!await sendEmail({ to: email, subject: 'Confirmation-Email', html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    } 



        //hashPassword
        const hashPassword = hash({ plaintext: password })
        //create user
            const defaultImg="https://res.cloudinary.com/dfzbcjlal/image/upload/v1684446232/user/64663434cfc958c22bb3dc90/profileImage/vymbybgy7u9jumuxz5vz.png"
            const { _id } = await userModel.create({ name,email,gender:gender.toLowerCase(),phone,job,country, password: hashPassword ,image:defaultImg,forgetCode})
        return res.status(201).json({ message: "Done", _id })
    }
)

export const charitysignup=asyncHandler(
    async (req,res,next)=>{
        const { name,email,password,Description,phone,CRN,address }=req.body;
        const role='charity';
        //check email exist
    
        if (await charityModel.findOne({ email: email.toLowerCase() }) || await userModel.findOne({ email: email.toLowerCase() }) || await adminModel.findOne({ email: email.toLowerCase() })) {
            return next(new Error("Email exist", { cause: 409 }))
        }
      
        //sendEmail()
        const nanoId = customAlphabet('123456789', 4)
        const forgetCode = nanoId()
        const html = `<html>
        <head>
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass * {
            line-height: 100%;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width: 480px) {
            @-ms-viewport {
              width: 320px;
            }
            @viewport {
              width: 320px;
            }
          }
        </style>
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
          rel="stylesheet"
          type="text/css"
        />
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (min-width: 480px) {
            .mj-column-per-100,
            * [aria-labelledby="mj-column-per-100"] {
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body style="background: #f9f9f9">
        <div style="background-color: #f9f9f9">
          <style type="text/css">
            html,
            body,
            * {
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            }
            a {
              color: #1eb0f4;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 40px 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                word-break: break-word;
                                font-size: 0px;
                                padding: 0px;
                              "
                              align="center"
                            >
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                style="border-collapse: collapse; border-spacing: 0px"
                                align="center"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td style="width: 138px">
                                     
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <div
              style="
                margin: 0px auto;
                max-width: 640px;
                background: #7289da
                  url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                  top center / cover no-repeat;
              "
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-size: 0px;
                  width: 100%;
                  background: #7289da
                    url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                    top center / cover no-repeat;
                "
                align="center"
                border="0"
                background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 57px;
                      "
                    >
                      <div
                        style="
                          cursor: auto;
                          color: white;
                          font-family: Whitney, Helvetica Neue, Helvetica, Arial,
                            Lucida Grande, sans-serif;
                          font-size: 36px;
                          font-weight: 600;
                          line-height: 36px;
                          text-align: center;
                        "
                      >
                        Welcome to Athar!
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="font-size: 0px; width: 100%; background: #ffffff"
                align="center"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 40px 70px;
                      "
                    >
                      <div
                        aria-labelledby="mj-column-per-100"
                        class="mj-column-per-100 outlook-group-fix"
                        style="
                          vertical-align: top;
                          display: inline-block;
                          direction: ltr;
                          font-size: 13px;
                          text-align: left;
                          width: 100%;
                        "
                      >
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  word-break: break-word;
                                  font-size: 0px;
                                  padding: 0px 0px 20px;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    cursor: auto;
                                    color: #737f8d;
                                    font-family: Whitney, Helvetica Neue, Helvetica,
                                      Arial, Lucida Grande, sans-serif;
                                    font-size: 16px;
                                    line-height: 24px;
                                    text-align: left;
                                  "
                                >
                                  <p>
                                    <img
                                      src="https://res.cloudinary.com/dfzbcjlal/image/upload/v1686483249/vbptqaqwrfnoiyuelgbk.png"
                                      alt="Party Wumpus"
                                      title="None"
                                      width="500"
                                      style="height: auto"
                                    />
                                  </p>
      
                                  <h2
                                    style="
                                      font-family: Whitney, Helvetica Neue, Helvetica,
                                        Arial, Lucida Grande, sans-serif;
                                      font-weight: 500;
                                      font-size: 20px;
                                      color: #4f545c;
                                      letter-spacing: 0.27px;
                                    "
                                  >
                                    Hey ${name},
                                  </h2>
                                  <p>
                                    Wowwee! Thanks for registering an account with
                                    Athar!
                                  </p>
                                  <p>
                                    Before we get started, we'll need to verify your
                                    email.
                                  </p>
                                  <br>
                                  <p>This is your verification code :</p>
                                </div>
                                <br> <br>
                            <button style="
                                      border: none;
                                      border-radius: 3px;
                                      color: white;
                                      cursor: auto;
                                      padding: 15px 19px;
                                      position: relative;
                                      left: 40%;
                                      /* align:center; */
                                      /* valign:middle; */
                                      background-color:#7289DA;
                                    "
                                    >${forgetCode}
                                  </button>
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]>
              </td></tr></table>
              <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td style="word-break: break-word; font-size: 0px">
                              <div style="font-size: 1px; line-height: 12px">
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              margin: 0 auto;
              max-width: 640px;
              background: #ffffff;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <table
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: #ffffff"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`

   

    if (!await sendEmail({ to: email, subject: 'Confirmation-Email', html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    } 



        //hashPassword
        const hashPassword = hash({ plaintext: password })
        //create user
            const defaultImg="https://res.cloudinary.com/dfzbcjlal/image/upload/v1684446232/user/64663434cfc958c22bb3dc90/profileImage/vymbybgy7u9jumuxz5vz.png"
            const { _id } = await charityModel.create({ name,email,password: hashPassword,Description,phone,CRN,address,image:defaultImg,forgetCode })
        return res.status(201).json({ message: "Done", _id })
    }
)




// export const confirmEmail = asyncHandler(async (req, res, next) => {
//     const { token } = req.params;

//     const { email ,role } = verifyToken({ token, signature: process.env.EMAIL_TOKEN })
//     if (!email) {
//         return next(new Error("In-valid token payload", { cause: 400 }))
//     }
//     let user;
//     if(role=='user'){
//         user = await userModel.updateOne({ email: email.toLowerCase() }, { confirmEmail: true })
//     }
//     else if(role=='charity'){
//         user = await charityModel.updateOne({ email: email.toLowerCase() }, { confirmEmail: true })
//     }
//     if (user.matchedCount) {
//         return res.status(200).redirect(`${process.env.FE_URL}/#/login`)
//     } else {
//         // return res.status(404).redirect(`${process.env.FE_URL}/#/NotRegisterAccount`)
//         // return res.status(404).render(`confirmEmail`, { message: "Not register account" })
//          return res.status(404).json({ message: "Not register account" })
//     }
// })

// export const NewConfirmEmail = asyncHandler(async (req, res, next) => {
//     const { token } = req.params;

//     const { email, role } = verifyToken({ token, signature: process.env.EMAIL_TOKEN })
//     if (!email) {
//         return next(new Error("In-valid token payload", { cause: 400 }))
//     }
//     let user;
//     if(role == 'user'){
//         user = await userModel.findOne({ email: email.toLowerCase() })
//     }
//     if(role == 'charity'){
//         user = await charityModel.findOne({ email: email.toLowerCase() })
//     }
//     if (!user) {
//         return next(new Error("Not register account", { cause: 404 }))
//     }
//     if (user.confirmEmail) {
//         return res.status(200).redirect(`${process.env.FE_URL}/#/login`)
//     }



//     const newToken = generateToken({ payload: { email }, signature: process.env.EMAIL_TOKEN, expiresIn: 60 * 2 })

//     const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
//     const rfLink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${token}`

//     const html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
//     <style type="text/css">
//     body{background-color: #88BDBF;margin: 0px;}
//     </style>
//     <body style="margin:0px;"> 
//     <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
//     <tr>
//     <td>
//     <table border="0" width="100%">
//     <tr>
//     <td>
//     <h1>
//         <img width="100px" src="${process.env.logo}"/>
//     </h1>
//     </td>
    
//     </tr>
//     </table>
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
//     <tr>
//     <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
//     <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <p style="padding:0px 100px;">
//     </p>
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <br>
//     <br>
//     <br>
//     <br>
  
//     <a href="${rfLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Request new  email </a>
//     <br>
//     <br>
//     </td>
//     </tr>
//     </table>
//     </td>
//     </tr>
//     <tr>
//     <td>
//     <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
//     <tr>
//     <td>
//     <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
//     </td>
//     </tr>
//     <tr>
//     <td>
    
//     </td>
//     </tr>
//     </table>
//     </td>
//     </tr>
//     </table>
//     </body>
//     </html>`

//     if (!await sendEmail({ to: email, subject: 'Confirmation-Email', html })) {
//         return next(new Error("Email rejected", { cause: 400 }))
//     }

//     return res.status(200).send("<p>New confirmation email sent to your inbox please check it ASAP.</p>")

// })

export const login = asyncHandler(async (req, res, next) => {

    const { email, password, role } = req.body;
    //check email exist
    let user;
    if(role.toLowerCase()=='user'){
        user = await userModel.findOne({ email })
    }
    else if(role.toLowerCase()=='charity'){
        user = await charityModel.findOne({ email })
    }
    else if(role.toLowerCase()=='admin'){
        user = await adminModel.findOne({ email })
    }
    if (!user) {
        return next(new Error("Not register account", { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error("Please confirm your email first", { cause: 400 }))
    }
    if (!compare({ plaintext: password, hashValue: user.password })) {
        return next(new Error("In-valid login data", { cause: 400 }))
    }
    const access_token = generateToken({
        payload: { id: user._id, role:role },
        expiresIn: 60 * 30
    })

    const refresh_token = generateToken({
        payload: { id: user._id, role:role},
        expiresIn: 60 * 60 * 24 * 365
    })

    user.status = 'online'
    await user.save()
    if(role.toLowerCase()=='user')  return res.status(200).json({ message: "Done", access_token, refresh_token ,Name:user.name,id:user._id,role:user.role,email:email,volunteer:user.volunteer})
    else return res.status(200).json({ message: "Done", access_token, refresh_token ,Name:user.name,id:user._id,role:user.role,email:email})
})


export const sendCode = asyncHandler(async (req, res, next) => {
    const { email, role } = req.body;
    //  const forgetCode 
    const nanoId = customAlphabet('123456789', 4)
    const forgetCode = nanoId()
    // const forgetCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    let user;
    if(role.toLowerCase()=='user'){
        user = await userModel.findOneAndUpdate({ email: email.toLowerCase() }, { forgetCode })
    }
    else if(role.toLowerCase()=='charity'){
        user = await charityModel.findOneAndUpdate({ email: email.toLowerCase() }, { forgetCode })
    }
    else if(role.toLowerCase()=='admin'){
        user = await adminModel.findOneAndUpdate({ email: email.toLowerCase() }, { forgetCode })
    }
    if (!user) {
        return next(new Error("Not register account", { cause: 404 }))
    }
    const html = `<html>
        <head>
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass * {
            line-height: 100%;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width: 480px) {
            @-ms-viewport {
              width: 320px;
            }
            @viewport {
              width: 320px;
            }
          }
        </style>
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
          rel="stylesheet"
          type="text/css"
        />
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (min-width: 480px) {
            .mj-column-per-100,
            * [aria-labelledby="mj-column-per-100"] {
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body style="background: #f9f9f9">
        <div style="background-color: #f9f9f9">
          <style type="text/css">
            html,
            body,
            * {
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            }
            a {
              color: #1eb0f4;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 40px 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                word-break: break-word;
                                font-size: 0px;
                                padding: 0px;
                              "
                              align="center"
                            >
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                style="border-collapse: collapse; border-spacing: 0px"
                                align="center"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td style="width: 138px">
                                     
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <div
              style="
                margin: 0px auto;
                max-width: 640px;
                background: #7289da
                  url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                  top center / cover no-repeat;
              "
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-size: 0px;
                  width: 100%;
                  background: #7289da
                    url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
                    top center / cover no-repeat;
                "
                align="center"
                border="0"
                background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 57px;
                      "
                    >
                      <div
                        style="
                          cursor: auto;
                          color: white;
                          font-family: Whitney, Helvetica Neue, Helvetica, Arial,
                            Lucida Grande, sans-serif;
                          font-size: 36px;
                          font-weight: 600;
                          line-height: 36px;
                          text-align: center;
                        "
                      >
                      Is that you!
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                style="font-size: 0px; width: 100%; background: #ffffff"
                align="center"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        vertical-align: top;
                        direction: ltr;
                        font-size: 0px;
                        padding: 40px 70px;
                      "
                    >
                      <div
                        aria-labelledby="mj-column-per-100"
                        class="mj-column-per-100 outlook-group-fix"
                        style="
                          vertical-align: top;
                          display: inline-block;
                          direction: ltr;
                          font-size: 13px;
                          text-align: left;
                          width: 100%;
                        "
                      >
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  word-break: break-word;
                                  font-size: 0px;
                                  padding: 0px 0px 20px;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    cursor: auto;
                                    color: #737f8d;
                                    font-family: Whitney, Helvetica Neue, Helvetica,
                                      Arial, Lucida Grande, sans-serif;
                                    font-size: 16px;
                                    line-height: 24px;
                                    text-align: left;
                                  "
                                >
                                  <p>
                                    <img
                                      src="https://res.cloudinary.com/dfzbcjlal/image/upload/v1686483249/vbptqaqwrfnoiyuelgbk.png"
                                      alt="Party Wumpus"
                                      title="None"
                                      width="500"
                                      style="height: auto"
                                    />
                                  </p>
      
                                  <h2
                                    style="
                                      font-family: Whitney, Helvetica Neue, Helvetica,
                                        Arial, Lucida Grande, sans-serif;
                                      font-weight: 500;
                                      font-size: 20px;
                                      color: #4f545c;
                                      letter-spacing: 0.27px;
                                    "
                                  >
                                    Hey ${user.name},
                                  </h2>
                                  <p>This is your verification code : </p>
                                </div>
                                <br> <br>
                            <button style="
                                      border: none;
                                      border-radius: 3px;
                                      color: white;
                                      cursor: auto;
                                      padding: 15px 19px;
                                      position: relative;
                                      left: 40%;
                                      /* align:center; */
                                      /* valign:middle; */
                                      background-color:#7289DA;
                                    "
                                    >${forgetCode}
                                  </button>
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]>
              </td></tr></table>
              <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="margin: 0px auto; max-width: 640px; background: transparent">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: transparent"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td style="word-break: break-word; font-size: 0px">
                              <div style="font-size: 1px; line-height: 12px">
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              margin: 0 auto;
              max-width: 640px;
              background: #ffffff;
              box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
            "
          >
            <table
              cellpadding="0"
              cellspacing="0"
              style="font-size: 0px; width: 100%; background: #ffffff"
              align="center"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: top;
                      font-size: 0px;
                      padding: 0px;
                    "
                  >
                    <div
                      aria-labelledby="mj-column-per-100"
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        vertical-align: top;
                        display: inline-block;
                        direction: ltr;
                        font-size: 13px;
                        text-align: left;
                        width: 100%;
                      "
                    >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`
    if (!await sendEmail({ to: email, subject: 'Forget Password', html })) {
        return next(new Error("Email rejected", { cause: 400 }))
    }
    return res.status(200).json({ message: "Done" })
})



export const confirmCode=asyncHandler(async(req,res,next)=>{
    const {email , code , role , process}=req.body;
    let user;
    if(role.toLowerCase()=='user'){
        user = await userModel.findOne({ email: email.toLowerCase() })
    }
    else if(role.toLowerCase()=='charity'){
        user = await charityModel.findOne({ email: email.toLowerCase() })
    }
    else if(role.toLowerCase()=='admin'){
        user = await adminModel.findOne({ email: email.toLowerCase() })
    }
    if (!user) {
        return next(new Error("Not register account", { cause: 404 }))
    }
    if (user.forgetCode != code) {
        return next(new Error("In-valid reset code", { cause: 400 }))
    }
    user.forgetCode = null
    if(process.toLowerCase()=='signup') user.confirmEmail=true;
    await user.save()
    return res.status(200).json({ message: "Done" })
})

export const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, password, role} = req.body;
    let user;
    if(role.toLowerCase()=='user'){
        user = await userModel.findOne({ email: email.toLowerCase() })
    }
    else if(role.toLowerCase()=='charity'){
        user = await charityModel.findOne({ email: email.toLowerCase() })
    }
    else if(role.toLowerCase()=='admin'){
        user = await adminModel.findOne({ email: email.toLowerCase() })
    }
    if (!user) {
        return next(new Error("Not register account", { cause: 404 }))
    }
    user.password = hash({ plaintext: password })
    user.changePasswordTime = Date.now()
    await user.save()
    return res.status(200).json({ message: "Done" })

})


export const logout= asyncHandler(async (req, res, next) =>{
    const {id,role}=req.body;
    let user;
    if(role.toLowerCase()=='user'){
        user=await userModel.deleteOne({_id:id})
    }
    else if(role.toLowerCase()=='charity'){
        user=await charityModel.deleteOne({_id:id})
    }
    else if(role.toLowerCase()=='admin'){
        user=await adminModel.deleteOne({_id:id})
    }
    if (!user.deletedCount) {
        return next(new Error("Not register account", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done" })
})

export const addAdmin=asyncHandler(async(req,res,next)=>{
    const {name,email,password,gender,phone,address}=req.body;
        
    //check email exist
        if (await userModel.findOne({ email: email.toLowerCase() }) || await charityModel.findOne({ email: email.toLowerCase() })) {
            return next(new Error("Email exist", { cause: 409 }))
        }

         //hashPassword
         const hashPassword = hash({ plaintext: password })
         //create user
            const defaultImg="https://res.cloudinary.com/dfzbcjlal/image/upload/v1684446232/user/64663434cfc958c22bb3dc90/profileImage/vymbybgy7u9jumuxz5vz.png"
             const { _id } = await adminModel.create({ name,email,gender,phone,address, password: hashPassword ,image:defaultImg})
         return res.status(201).json({ message: "Done", _id })
})