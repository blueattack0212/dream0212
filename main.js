const API_KEY = process.env.OPENAI_API_KEY; // 请替换为您的 API 密钥
const API_URL = "https://api.openai.com/v1/chat/completions"; // 根据需要替换为相应的 API URL

const dreamForm = document.getElementById("dreamForm");
const resultDiv = document.getElementById("result");

dreamForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // 阻止表单的默认提交行为

    // 收集表单数据
    const description = document.getElementById("description").value;
    const emotion = document.getElementById("emotion").value;
    const environment = document.getElementById("environment").value;
    const characters = document.getElementById("characters").value;
    const time = document.getElementById("time").value;

   // 构建请求正文
const requestBody = {
    model: "gpt-3.5-turbo", // 请使用您希望使用的模型名称
    messages: [
        { role: "system", content: "You are a helpful assistant that interprets dreams." },
        { role: "user", content: `我做了一个梦，梦境的情感是 ${emotion}，环境是 ${environment}，角色是 ${characters}，时间是 ${time}。梦境的描述是：${description}` },
    ],
    max_tokens: 1000, // 您可以根据需要调整生成的文本长度
    temperature: 1.0,
};

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
    };

    // 在发送请求前显示等待消息
    resultDiv.innerHTML = "<p>已提交，等待结果中...</p>";

    // 发送请求并处理响应
    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        // 在页面上显示解释结果
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            resultDiv.innerHTML = `<h3>梦境解释：</h3><p>${data.choices[0].message.content}</p>`;
        } else {
            resultDiv.innerHTML = "<p>无法解释此梦境，请尝试提供更多详细信息。</p>";
        }
    } catch (error) {
        console.error("Error fetching GPT-3.5 API:", error);
        resultDiv.innerHTML = "<p>获取解释时出错，请稍后再试。</p>";
    }
});
