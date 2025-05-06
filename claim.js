const axios = require('axios');
const chalk = require('chalk');
const cfonts = require('cfonts');
const HttpProxyAgent = require('http-proxy-agent');
const SocksProxyAgent = require('socks-proxy-agent');
const readlineSync = require('readline-sync');
const fs = require('fs').promises;

const banner = () => {
    cfonts.say('Airdrop 888', {
        font: 'block',
        align: 'center',
        colors: ['cyan', 'yellow'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
    });
    console.log(chalk.green.bold('Script coded by - @balveerxyz || Auto Claim Pi Monad 🚀\n'));
};

const loadFile = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return data.split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.error(chalk.red(`❌ Error reading ${file}: ${error.message}`));
        return [];
    }
};

const parseUsername = (line) => {
    // Split by comma and take the first valid part as the username
    const parts = line.split(',').map(part => part.trim());
    const username = parts[0];
    // Basic validation: username should not be empty or contain invalid characters
    if (!username || /[^a-zA-Z0-9_]/.test(username)) {
        console.log(chalk.yellow(`⚠️ Invalid username format: ${line}`));
        return null;
    }
    return username;
};

const getProxyAgent = (proxy) => {
    if (proxy.startsWith('http://')) {
        return new HttpProxyAgent(proxy);
    } else if (proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
        return new SocksProxyAgent(proxy);
    }
    return null;
};

const claim = async (username, proxy = null) => {
    if (!username) return;

    const url = `https://api.pinad.dev/user/points/${username}`;
    const config = {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
            'origin': 'https://pinad.dev',
            'referer': 'https://pinad.dev/',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
    };
    if (proxy) {
        config.httpsAgent = getProxyAgent(proxy);
    }

    try {
        const response = await axios.get(url, config);
        if (response.status === 200 && response.data.message === 'Claim successful') {
            console.log(chalk.green(`✅ ${username} - Claim successful! 🎉`));
        } else {
            console.log(chalk.yellow(`⚠️ ${username} - Unexpected response: ${JSON.stringify(response.data)}`));
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.error(chalk.red(`❌ ${username} - HTTP 422: ${JSON.stringify(error.response.data)} 😢`));
        } else {
            console.error(chalk.red(`❌ ${username} - Error: ${error.message} 😢`));
        }
    }
};

const displayTimer = (remainingSeconds) => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    process.stdout.write(`\r${chalk.cyan('⏰ Time remaining: ')}${chalk.yellow(`${hours}h ${minutes}m ${seconds}s`)}`);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    banner();
    const useProxy = readlineSync.question(chalk.cyan('Mau menggunakan proxy? (y/n): ')).toLowerCase() === 'y';
    const rawUsernames = await loadFile('accounts.txt');
    const proxies = useProxy ? await loadFile('proxy.txt') : [];

    const usernames = rawUsernames.map(parseUsername).filter(u => u);

    if (!usernames.length) {
        console.log(chalk.red('❌ No valid usernames found in accounts.txt 😞'));
        return;
    }
    if (useProxy && !proxies.length) {
        console.log(chalk.red('❌ No proxies found in proxy.txt 😞'));
        return;
    }

    const cycleDuration = 3600; // 1 hour in seconds
    while (true) {
        console.log(chalk.blue('\n🔄 Starting new claim cycle...'));
        for (let i = 0; i < usernames.length; i++) {
            const username = usernames[i];
            const proxy = useProxy ? proxies[i % proxies.length] : null;
            console.log(chalk.magenta(`🧑 Processing ${username} ${proxy ? `with proxy ${proxy}` : 'without proxy'}...`));
            await claim(username, proxy);
            await sleep(1000); // 1 second delay between claims
        }

        console.log(chalk.blue('\n⏳ Cycle completed! Waiting for next cycle...'));
        let remaining = cycleDuration;
        while (remaining > 0) {
            displayTimer(remaining);
            await sleep(1000);
            remaining--;
        }
        process.stdout.write('\n');
    }
};

main().catch(error => console.error(chalk.red(`❌ Fatal error: ${error.message} 😱`)));