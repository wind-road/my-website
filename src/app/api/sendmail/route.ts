import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// 定义请求体的接口
interface MailRequestBody {
  subject: string;
  yourEmail: string;
  message: string;
}
export async function POST(req: NextRequest) {
  console.log("请求方法:", req, req.method);
 
  // 配置邮箱（建议使用环境变量）
  const transporter = nodemailer.createTransport({
    service: "QQ",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 解析请求体并验证类型
    const body: MailRequestBody = await req.json();
    const { subject, yourEmail, message } = body;

    console.log("发送邮件:", {
      subject,
      yourEmail,
      message,
    });
    // 发送邮件
    const info = await transporter.sendMail({
      from: `"网站联系表单" <${process.env.EMAIL_USER}>`,
      to: process.env.YOUR_RECEIVE_EMAIL, // 你的接收邮箱
      subject: "关于个人网站的留言",
      text: `
        邮箱: ${yourEmail}
        主题: ${subject}
        内容: ${message}
      `,
      html: `
        <p>邮箱: ${yourEmail}</p>
        <p>主题: ${subject}</p>
        <p>内容: ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully", info },
      { status: 200 }
    );
  } catch (error) {
    console.error("发送失败:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
