let btn = (id) => {
  let bt = document.querySelectorAll(".btn");
  let curentbtn = document.getElementById(id);
  bt.forEach((b) => {
    b.classList.remove("btn-primary");
  });
  curentbtn.classList.add("btn-primary");
  curentbtn.classList.remove("btn-outline");
};

let allIssues = [];

// src start
let enterBtn = document.querySelector(".enterbtn");
enterBtn.addEventListener("click", function () {
  let inputsearch = document.querySelector(".input-search").value;
  inputSearchUrl(inputsearch);
});
let inputSearchUrl = (value) => {
  let url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`;
  fetch(url)
    .then((res) => res.json())
    .then((datass) => {
      maincontainerDisplay(datass.data);
      issuDisplayfun(datass.data);
    });
};
// src end

let issuCountApiget = () => {
  loding(true);
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((datas) => {
      allIssues = datas.data;
      issuDisplayfun(datas.data);
      maincontainerDisplay(datas.data);
    });
};
issuCountApiget();

let issuDisplayfun = (items) => {
  let issucrounts = document.querySelector(".issucrounts");
  issucrounts.innerHTML = "";
  issucrounts.innerText = `${items.length}`;
};

let bugs = (arra) => {
  let element = arra.map(
    (ar) =>
      `<dib class="bg-[#FEECEC] text-[#EF4444] p-1 px-3 rounded-xl">${ar}</dib>`,
  );
  return element.join("");
};

let maincontainerDisplay = (items) => {
  let mains = document.querySelector(".mains");
  mains.innerHTML = "";
  items.forEach((item) => {
    let div = document.createElement("div");
    div.setAttribute("onclick", `modalFunction(${item.id})`);
    div.setAttribute(
      "class",
      `children shadow space-y-3 p-5 rounded-xl border-t-4  ${item.priority === "low" ? "border-pink-300" : item.priority === "medium" ? "border-yellow-500" : item.priority === "high" ? "border-green-500" : "border-gray-300"} `,
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
    loding(false);
  });
};

function loding(boliyan) {
  let mains = document.querySelector(".mains");
  let loadingSection = document.querySelector(".loadingSection");
  if (boliyan == true) {
    loadingSection.classList.remove("hidden");
    mains.classList.add("hidden");
  } else {
    loadingSection.classList.add("hidden");
    mains.classList.remove("hidden");
  }
}

let modalFunction = (id) => {
  let url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => modalShowFunction(datas.data));
};

let modalShowFunction = (item) => {
  let modalSection = document.querySelector(".modalSection");
  modalSection.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
  <h1 class="font-bold text-[24px]">${item.title}</h1>
  <div class="flex gap-3 items-center"><button class="btn btn-success rounded-2xl">${item.status}</button>
  <h1>${item.author}</h1>
  </div>
                        <div class = "my-3 flex gap-3">
                            ${bugs(item.labels)}
                        </div>
                        <p class="text-[#64748B]">${item.description}</p>
                        <div class="grid grid-cols-2 bg-[#F8FAFC] rounded-xl p-4">
                            <div class="start">
                                <h1 class="text-[#64748B]">Assignee:</h1>
                                <p class="font-semibold">${item.author}</p>
                            </div>
                            <div class="end">
                                <h1 class="text-[#64748B]">Priority:</h1>
                                <button class="btn">${item.priority}</button>
                            </div>
                        </div>
  `;
  modalSection.append(div);
  document.querySelector("#my_modal_5").showModal();
};

let filterByStatus = (status) => {
  if (status === "all") {
    maincontainerDisplay(allIssues);
    issuDisplayfun(allIssues);
  } else {
    let filtered = allIssues.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase(),
    );
    maincontainerDisplay(filtered);
    issuDisplayfun(filtered);
  }
};

let allBtn = document.getElementById("allBtn");
let openBtn = document.getElementById("openBtn");
let closedBtn = document.getElementById("closedBtn");

allBtn.addEventListener("click", () => {
  btn("allBtn");
  filterByStatus("all");
});

openBtn.addEventListener("click", () => {
  btn("openBtn");
  filterByStatus("open");
});

closedBtn.addEventListener("click", () => {
  btn("closedBtn");
  filterByStatus("closed");
});
