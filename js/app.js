class Display {
  constructor(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
    this.fields = [this.name, this.course, this.author];
  }

  checkFields() {
    for (const field of this.fields) {
      field.addEventListener("blur", function () {
        if (field.value.trim() === "") {
          field.classList.remove("complete");
          field.classList.add("fail");
        } else {
          field.classList.remove("fail");
          field.classList.add("complete");
        }
      });
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 6);
  }

  createCustomer() {
    if (
      this.name.value.trim() !== "" &&
      this.course.value.trim() !== "" &&
      this.author.value.trim() !== ""
    ) {
      const customer = new Customer(
        `./img/cust-${this.getRandomNumber()}.jpg`,
        this.name.value,
        this.course.value,
        this.author.value
      );
      customer.renderCustomer();
    } else {
      for (const field of this.fields) {
        if (field.value.trim() === "") {
          field.classList.add("fail");
        }
      }
    }
  }

  clearFields() {
    if (
      this.fields[0].value.trim() !== "" &&
      this.fields[1].value.trim() !== "" &&
      this.fields[2].value.trim() !== ""
    ) {
      for (const field of this.fields) {
        field.value = "";
        field.classList.remove("fail", "complete");
      }
    }
  }

  showLoading() {
    const loading = document.querySelector("div.loading");
    const feedbackdiv = document.querySelector(
      "#customer-form > div.feedback.text-center.text-capitalize"
    );
    loading.classList.add("showItem");
    feedbackdiv.classList.add("showItem", "alert", "alert-success");
    window.setTimeout(function () {
      loading.classList.remove("showItem");
      feedbackdiv.classList.remove("showItem", "alert", "alert-success");
    }, 2000);
  }
}

class Customer extends Display {
  constructor(image, name, course, author) {
    super(name, course, author);
    this.image = image;
  }
  renderCustomer() {
    const customerDiv = document.createElement("div");
    const customersContainer = document.querySelector("div.customer-list");
    customerDiv.classList.add(
      "col-11",
      "mx-auto",
      "col-md-6",
      "col-lg-4",
      "my-3"
    );
    customerDiv.style.display = "none";
    window.setTimeout(function () {
      customerDiv.style.display = "block";
    }, 2000);

    customerDiv.innerHTML = `<div class="card text-left">
    <img src="${this.image}" class="card-img-top" alt="">
    <div class="card-body">
     <!-- customer name -->
     <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${this.name}</span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
       ${this.course}
      </span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${this.author}</span></h6>
     <!-- end of customer name -->
    </div>
   </div>`;

    customersContainer.appendChild(customerDiv);
  }
}
class Start {
  constructor(btn) {
    this._btn = btn;
  }
  get btn() {
    return this._btn;
  }

  addCustomer(e) {
    e.preventDefault();
    display.createCustomer();
    display.clearFields();
    display.showLoading();
  }
}

const start = new Start(document.querySelector("button"));

start.btn.addEventListener("click", start.addCustomer);

///////////////////////////////////

const display = new Display(
  document.getElementById("name"),
  document.getElementById("course"),
  document.getElementById("author")
);
display.checkFields();
