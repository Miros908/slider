class FunctionSlider {
  createElement(
    tagName,
    className,
    content = null,
    attribute = null,
    attributeValue = null
  ) {
    const element = document.createElement(tagName);
    element.className = className;
    if (content) {
      element.innerHTML = content;
    }

    if (attribute && attributeValue) {
      element.setAttribute(attribute, attributeValue);
    }

    return element;
  }

  applyAnimationAndRemoveClass(element, animationClassName) {
    element.classList.add(animationClassName);

    element.addEventListener("animationend", function handler() {
      element.classList.remove(animationClassName);

      element.removeEventListener("animationend", handler);
    });
  }

  updateActiveIndicators(allIndicators, currentIndex, startIndex) {
    allIndicators.forEach((elem) => {
      elem.classList.remove("activePaginationItem");
      elem.classList.remove("active");
    });

    for (let i = startIndex; i <= currentIndex; i++) {
      allIndicators[i].classList.add("activePaginationItem");
    }
  }
}

const functions = new FunctionSlider();

function createSlider(selector, options = {}) {
  const optionsDef = {
    btnBack: "<",
    btnNext: ">",
    onPrev: () => {},
    onNext: () => {},
    widthSlide: "200px",
    heightSlide: "200px",
    visiblePaginationRange: "5",
  };

  let sliderCounter = 0;
  let sliderCoordinate = 0;
  let startIndex = 0;

  options = Object.assign({}, optionsDef, options);

  const sliderList = document.querySelector(`${selector}`);
  if (!sliderList) {
    throw new Error("Селектор не найден");
  }

  sliderList.classList.add("sliderlist");

  const lengthList = sliderList.children.length - 1;

  const sliderListItem = [...sliderList.children];

  sliderListItem.forEach((elem) => {
    [...elem.children].forEach((item) => {
      item.style.width = options.widthSlide;
      item.style.height = options.heightSlide;
    });
  });

  const buttonPrev = functions.createElement(
    "button",
    "buttonPrev",
    options.btnBack,
    "type",
    "button"
  );
  const buttonNext = functions.createElement(
    "button",
    "buttonNext",
    options.btnNext,
    "type",
    "button"
  );

  const sliderBlock = functions.createElement("div", "sliderBlock");
  const blockWrapper = functions.createElement("div", "blockWrapper");

  const paginationSlider = functions.createElement("div", "paginationSlider");

  for (let i = 0; i <= lengthList; i++) {
    const paginationItem = functions.createElement("div", "paginationItem");

    paginationItem.innerHTML = i + 1;

    paginationSlider.appendChild(paginationItem);

    if (i < options.visiblePaginationRange) {
      paginationItem.classList.add("activePaginationItem");
    }
  }

  const indicators = [...paginationSlider.children];

  indicators[sliderCounter].classList.add("active");

  sliderBlock.style.width = options.widthSlide; //???
  sliderBlock.style.height = options.heightSlide; //???

  const sliderWrapper = functions.createElement("div", "sliderWrapper");

  blockWrapper.appendChild(buttonPrev);
  blockWrapper.appendChild(sliderBlock);
  blockWrapper.appendChild(buttonNext);
  sliderWrapper.appendChild(blockWrapper);

  sliderList.insertAdjacentElement("afterend", sliderWrapper);

  sliderBlock.appendChild(sliderList);

  sliderWrapper.appendChild(paginationSlider);

  const parseWidth = parseInt(options.widthSlide, 10);
  sliderWrapper.addEventListener("click", (event) => {
    const closestButton = event.target.closest("button");
    if (closestButton) {
      const eventTargetClass = closestButton.classList;

      if (eventTargetClass.contains("buttonNext")) {
        sliderCoordinate -= parseWidth;
        sliderCounter++;
        startIndex = Math.max(
          sliderCounter - (options.visiblePaginationRange - 1),
          0
        );

        if (sliderCounter > lengthList) {
          sliderCounter = 0;
          sliderCoordinate = 0;
        }

        sliderList.style.transform = `translateX(${sliderCoordinate}px)`;
      }

      if (eventTargetClass.contains("buttonPrev")) {
        if (sliderCounter !== 0) {
          sliderCounter--;
          startIndex = Math.max(
            sliderCounter - (options.visiblePaginationRange - 1),
            0
          );
          sliderCoordinate += parseWidth;
        } else {
          sliderCounter = lengthList;
          sliderCoordinate = -parseWidth * lengthList;
          startIndex = Math.max(
            sliderCounter - (options.visiblePaginationRange - 1),
            0
          );
        }

        sliderList.style.transform = `translateX(${sliderCoordinate}px)`;
      }
      if (sliderCounter <= options.visiblePaginationRange - 1) {
        functions.updateActiveIndicators(
          indicators,
          options.visiblePaginationRange - 1,
          0
        );
      } else {
        functions.updateActiveIndicators(indicators, sliderCounter, startIndex);
      }

      functions.applyAnimationAndRemoveClass(
        sliderListItem[sliderCounter],
        "rotate-element"
      );
      indicators[sliderCounter].classList.add("active");
    }
  });
}

createSlider(".list");
