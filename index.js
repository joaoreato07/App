const { select, input, checkbox } = require("@inquirer/prompts")

let meta = {
    value:"Tomar 3L de agua por dia",
    checked:false,
}
let metas = [meta]

const cadastarMeta = async () =>{
    const meta = await input({message:"Digite a Meta"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push({ 
        value:meta, checked:false}
    )

}

const listarMetas = async ()=>{
    const respostas = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices:[...metas],
        instructions:false,
    })

    metas.forEach((m)=> {
        m.checked = false
    })

    if(respostas == 0){
        console.log("Nenhuma meta selecionada")
        return
    }

    

    respostas.forEach((resposta) =>{
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Metas marcadas como concluidas")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("não existem metas realizadas ;(")
        return

    }

    await select({
        message: "metas realizadas",
        choices:[...realizadas]
    })

}

const start = async() => {

    
    while(true){
        
        const opcao = await select({
            message:"Menu >",
            choices: [
                {
                    name:"Cadastrar meta",
                    value:"cadastrar"
                },
                {
                    name:"Listar meta",
                    value:"listar"
                },
                {
                    name:"Metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })


        switch(opcao){
            case  "cadastrar":
                await cadastarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
                case "realizadas":
                    await metasRealizadas()
                    break
            case "sair":
                console.log("Até mais")
                return
        }
    }
    
}
start()