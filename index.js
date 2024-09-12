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
        message: "metas realizadas" + realizadas.length,
        choices:[...realizadas]
    })

}

const metasAbertas = async() => {
    const abertas = metas.filter((metas) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        console.log("Não existe metas abertas!")
        return
    }

    await select({
        message: "Metas abertas" + abertas.length,
        choices:[...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itemADeletar = await checkbox({
        message:"Selecione item para deletar",
        choices:[...metasDesmarcadas],
        instructions:false,
    })

    if(itemADeletar.length == 0){
        console.log("Nenhum item a deletar")
        return
    }

    itemADeletar.forEach((item)=>{
       metas = metas.filter((meta)=>{
        return meta.value != item
       })
    })

    console.log("metas deletadas com sucesso")

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
                    name:"Metas abertas",
                    value:"abertas"
                },
                {
                    name:"Deletar metas",
                    value:"deletar"
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
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até mais")
                return
        }
    }
    
}
start()