function createSlider(selector, options = {}) {
  function applyAnimationAndRemoveClass(element, animationClassName) {
    element.classList.add(animationClassName);

    element.addEventListener("animationend", function handler() {
      element.classList.remove(animationClassName);

      element.removeEventListener("animationend", handler);
    });
  }
  function createElement(
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

  function updateActiveIndicators(allIndicators, currentIndex, startIndex) {
    allIndicators.forEach((elem) => {
      elem.classList.remove("activePaginationItem");
      elem.classList.remove("active");
    });

    for (let i = startIndex; i <= currentIndex; i++) {
      allIndicators[i].classList.add("activePaginationItem");
    }
  }

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
  sliderList.style.display = "flex";
  sliderList.style.padding = "0";
  sliderList.style.position = "absolute";
  sliderList.style.transition = "left 1s";
  sliderList.style.left = "0";

  const lengthList = sliderList.children.length - 1;

  const sliderListItem = [...sliderList.children];

  sliderListItem.forEach((elem) => {
    elem.style.transition = "transform 1s";
    [...elem.children].forEach((item) => {
      item.style.width = options.widthSlide;
      item.style.height = options.heightSlide;
    });
  });

  const buttonPrev = createElement(
    "button",
    "buttonPrev",
    options.btnBack,
    "type",
    "button"
  );
  const buttonNext = createElement(
    "button",
    "buttonNext",
    options.btnNext,
    "type",
    "button"
  );

  const sliderBlock = createElement("div", "sliderBlock");
  const blockWrapper = createElement("div", "blockWrapper");

  const paginationSlider = createElement("div", "pagination");
  paginationSlider.style.display = "flex";
  paginationSlider.style.gap = "10px";
  paginationSlider.style.left = "53px";
  paginationSlider.style.top = "223px";

  for (let i = 0; i <= lengthList; i++) {
    const paginationItem = createElement("div", "paginationItem");

    paginationItem.style.width = "20px";
    paginationItem.style.height = "20px";
    paginationItem.style.border = "2px solid black";
    paginationItem.style.borderRadius = "50%";
    paginationItem.innerHTML = i + 1;
    paginationItem.style.textAlign = "center";
    paginationSlider.appendChild(paginationItem);

    if (i < options.visiblePaginationRange) {
      paginationItem.classList.add("activePaginationItem");
    }
  }

  const indicators = [...paginationSlider.children];

  indicators[sliderCounter].classList.add("active");

  sliderBlock.style.width = options.widthSlide;
  sliderBlock.style.height = options.heightSlide;
  sliderBlock.style.overflow = "hidden";
  sliderBlock.style.position = "relative";

  const sliderWrapper = createElement("div", "sliderWrapper");

  sliderWrapper.style.display = "flex";
  sliderWrapper.style.flexDirection = "column";
  sliderWrapper.style.alignItems = "center";
  sliderWrapper.style.gap = "20px";

  blockWrapper.style.display = "flex";
  blockWrapper.style.position = "relative";
  blockWrapper.appendChild(buttonPrev);
  blockWrapper.appendChild(sliderBlock);
  blockWrapper.appendChild(buttonNext);
  sliderWrapper.appendChild(blockWrapper);

  sliderList.insertAdjacentElement("afterend", sliderWrapper);

  sliderBlock.appendChild(sliderList);

  sliderWrapper.appendChild(paginationSlider);

  const parseWidth = parseInt(options.widthSlide, 10);
  sliderWrapper.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      const eventTargetClass = event.target.closest("button").classList;

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

        sliderList.style.left = `${sliderCoordinate}px`;
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

        sliderList.style.left = `${sliderCoordinate}px`;
      }
      if (sliderCounter <= options.visiblePaginationRange - 1) {
        updateActiveIndicators(
          indicators,
          options.visiblePaginationRange - 1,
          0
        );
      } else {
        updateActiveIndicators(indicators, sliderCounter, startIndex);
      }
      console.log(sliderCounter);
      applyAnimationAndRemoveClass(
        sliderListItem[sliderCounter],
        "rotate-element"
      );
      indicators[sliderCounter].classList.add("active");
    }
  });
}

createSlider(".list");
