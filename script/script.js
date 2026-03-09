let btn = (id) => {
  let bt = document.querySelectorAll(".btn");
  let curentbtn = document.getElementById(id);
  //   bt.classList.remove("btn-primary");
  bt.forEach((b) => {
    b.classList.remove("btn-primary");
  });
  curentbtn.classList.add("btn-primary");
  curentbtn.classList.remove("btn-outline");
};

let issuCountApiget = () => {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((datas) => {
      issuDisplayfun(datas.data);
      maincontainerDisplay(datas.data);
    });
};
issuCountApiget();

let issuDisplayfun = (items) => {
  let issucrounts = document.querySelector(".issucrounts");
  issucrounts.innerText = `${items.length}`;
};

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

let bugs = (arra) => {
  let element = arra.map(
    (ar) =>
      `<dib class="bg-[#FEECEC] text-[#EF4444] p-1 px-3 rounded-xl">${ar}</dib>`,
  );
  return element.join("");
};

// main work start
let maincontainerDisplay = (items) => {
  let mains = document.querySelector(".mains");

  items.forEach((item) => {
    // console.log(item.priority);
    let div = document.createElement("div");
    div.setAttribute(
      "class",
      "children shadow space-y-3 p-5 rounded-xl border-t-4  border-green-500",
    );
    div.innerHTML = `
    <div class="chi-img flex justify-between ">
                    <img class="w-7 h-7" src="assets/Open-Status.png" alt="" srcset="">
                    <button class="prioritybtn bg-[#FEECEC] text-[#EF4444] p-1 px-3 rounded-xl">${item.priority}</button>
                </div>
                <h1 class="font-semibold">${item.title}</h1>
                <p class="text-[14px] text-[#64748B] line-clamp-2">${item.description}.
                </p>
                <div class="flex gap-3">${bugs(item.labels)}</div>
                <div class="hr h-0.5 bg-[#64748B]"></div>
                <p class="text-[14px] text-[#64748B]">${item.author}</p>
                <p class="text-[14px] text-[#64748B]">${new Date(item.updatedAt).toLocaleDateString()}</p>
    `;
    mains.append(div);
    console.log(item.createdAt);
  });
};

// let arra = ["new", "old", "good"];
