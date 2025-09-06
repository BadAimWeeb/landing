const os = require("os");
const path = require("path");
const fs = require("fs/promises");
const childProcess = require("child_process");

const cwd = process.cwd(), tmp = os.tmpdir(), pat = process.env.MAIN_PAT;

function execPromise(cmd, cwd) {
    let grs, grj;
    let p = new Promise((rs, rj) => {
        grs = rs; grj = rj;
    })
    childProcess.exec(cmd, {
        cwd,
        shell: true
    }, (e, stdout, stderr) => {
        if (e) return grj([stdout, stderr, e]);
        return grs([stdout, stderr]);
    });

    return p;
}

(async () => {
    await execPromise("git config --global user.name BAW_CI_AUTOMATION");
    await execPromise("git config --global user.email noreply+bot@badaimweeb.me");
    await execPromise("git config --global alias.rm-deleted '!git rm $(git ls-files --deleted)'");

    await execPromise(`git clone https://BadAimWeeb:${pat}@github.com/BadAimWeeb/BadAimWeeb.git ${path.join(tmp, "crepo0")}`);

    await fs.rm(path.join(tmp, "crepo0", "docs", "landing-assets"), { recursive: true }).catch(() => { });
    await fs.cp(path.join(cwd, "dist", "landing-assets"), path.join(tmp, "crepo0", "docs", "landing-assets"), { recursive: true });
    await fs.cp(path.join(cwd, "dist", "index.html"), path.join(tmp, "crepo0", "docs", "index.html"));

    // Handle any pages in github pages (use 404)
    await fs.cp(path.join(tmp, "crepo0", "docs", "index.html"), path.join(tmp, "crepo0", "docs", "404.html"));

    let commit = (await execPromise("git rev-parse --short HEAD", cwd))[0].replace(/\r/g, "").replace(/\n/g, "");
    let version = require("../package.json").version;

    await execPromise("git add .", path.join(tmp, "crepo0"));
    try {
        await execPromise("git rm-deleted", path.join(tmp, "crepo0"));
    } catch { }
    await execPromise(`git commit -m "Publish automated build result from ${version}+${commit}"`, path.join(tmp, "crepo0"));
    await execPromise("git push", path.join(tmp, "crepo0"));

    await fs.rm(path.join(tmp, "crepo0"), { recursive: true });
})().catch(x => {
    console.log("Failed!", x);
    process.exit(1);
});
