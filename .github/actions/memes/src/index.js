const core = require("@actions/core");
const fs = require("fs").promises;

async function main() {
    try{
        const todo_ok = core.getInput('frase-positiva').split(' ').join('_');
        const todo_mal = core.getInput('frase-negativa').split(' ').join('_');
        const resultado_test = core.getInput('resultat-tests');
    
        const image = resultado_test === 'success' ? 'stonks' : 'sarcasticbear';
        const url = `https://api.memegen.link/images/${image}/${resultado_test === 'success' ? todo_ok : todo_mal}.png`;

        const oldReadme = await fs.readFile('./../../../../../../OldREADME.md', 'utf8');
        const newReadme = oldReadme + `<img src="${url}" />`;

        await fs.writeFile('./README.md', newReadme);
        process.exit(0);
    }catch(e){
        core.setFailed(e);
    }
}

main();