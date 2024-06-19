const mainUrl = "http://localhost:8000/todos/";
const submit  = document.getElementById("todoForm");
const title   = document.getElementById("title");
const description = document.getElementById("description");
const completed   = document.getElementById("completed");
const excluir = document.getElementById("excluir");


submit.addEventListener("submit", (e) => {
    
    if (title.value === "" || description.value === "") {
        window.alert("Por favor, preencha todos os campos"); 
        return;
    }

    e.preventDefault();
    fetch(mainUrl, {
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            done: completed.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("Erro ao criar o todo:", data.error);
        } else {
            console.log("Todo criado com sucesso:", data);
            title.value = "";
            description.value = "";
            completed.value = "false";
        }
    })
    .catch(error => {
        console.error("Erro ao criar o todo:", error);
    });
});


excluir.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(mainUrl, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao excluir o todo");
        }
        return res.json();
    })
    .then(data => {
            success.textContent = "Todos excluídos com sucesso!";
    })
    .catch(error => {
        console.error("Erro ao excluir os todos:", error);
    });
});


function getTodos() {
    const mainUrl = "http://localhost:8000/todos/";

    fetch(mainUrl)
    .then(res => res.json())
    .then(data => {
        const outputDiv = document.querySelector(".output");

        data.forEach((element, index) => {
            const div = document.createElement("div");
            div.classList.add("todo_lista");
            
            const completed = document.createElement("span");
            completed.textContent = element.done ? "Concluído" : "Pendente";

            if (element.done) {
                completed.classList.add("completed");
            } else {
                completed.classList.add("completed_false");
            }
            const p = document.createElement("h1");
            p.textContent = element.title;
            p.classList.add("title");

            const span = document.createElement("span");
            span.textContent = "Sobre: " + element.description;
            span.classList.add("description");


            const imagem_atualizar = document.createElement("img");
            
            if (element.done) {
                imagem_atualizar.src = "img/feito.png";
                imagem_atualizar.classList.add("imagem");
            } else {
                imagem_atualizar.src = "img/remover.png";
                imagem_atualizar.classList.add("imagem_remover");
            }



            imagem_atualizar.addEventListener("click", () => atualizar(mainUrl, element));



            const bimagem = document.createElement("img");
            bimagem.src = "img/trash_remove.png";
            bimagem.classList.add("bimagem");

            bimagem.addEventListener("click", (e) => {
                e.preventDefault();

                const TodoId = element.id;

                fetch(mainUrl + TodoId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.error("Erro ao excluir o todo:", data.error);
                    } else {
                        console.log("Todo excluído com sucesso:", data);
                    }
                })
                .catch(error => {
                    console.error("Erro ao excluir o todo:", error);
                });
            });
            div.appendChild(bimagem);
            div.appendChild(imagem_atualizar);
            div.appendChild(p);
            div.appendChild(span);
            div.appendChild(completed);
            

            

            outputDiv.appendChild(div);

        });
    })
    .catch(error => {
        console.error("Erro ao buscar os todos:", error);
    });
}


function atualizar(url, element){

    const tudoUpdate = {
        title: element.title,
        description: element.description,
        done: !element.done
    };

    fetch(url + element.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tudoUpdate)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("Erro ao atualizar o todo:", data.error);
        } else {
            console.log("Todo atualizado com sucesso:", data);
        }
    })
    .catch(error => {
        console.error("Erro ao atualizar o todo:", error);
    });

    
}

getTodos();