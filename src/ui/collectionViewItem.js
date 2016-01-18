var colors = require("../../resources/colors.json");
var viewDataProvider = require("../data/viewDataProvider");
var CategoryPage = require("../pages/CategoryPage");
var SessionPage = require("../pages/SessionPage");

module.exports = {
  title: {
    itemHeight: 48,
    initializeCell: function(cell) {
      var header = tabris.create("Composite", {
        left: 0, top: 0, right: 0, height: 48
      }).appendTo(cell);
      var titleTextView = tabris.create("TextView", {
        left: 16, centerY: 0,
        font: "bold 16px"
      }).appendTo(header);
      tabris.create("TextView", {
        right: 16, centerY: 0,
        textColor: colors.ACCENTED_TEXT_COLOR,
        font: "bold 14px",
        text: "MORE"
      }).appendTo(header);
      cell.on("change:item", function(cell, item) {
        titleTextView.set("text", item.title);
      });
    },
    select: function(widget, item) {
      CategoryPage
        .create()
        .open()
        .set("data", {
          title: item.title,
          items: viewDataProvider.getCategory(item.id)
        });
    }
  },
  session: {
    itemHeight: 96,
    initializeCell: function(cell) {
      var session = createSession().appendTo(cell);
      cell.on("change:item", function(cell, item) {
        session.set("data", item);
      });
    },
    select: sessionSelectCallback
  },
  separator: {
    itemHeight: 8,
    initializeCell: function(cell) {
      cell.set("background", colors.LIGHT_BACKGROUND_COLOR);
    },
    select: function() {}
  },
  categorySession: {
    itemHeight: 96,
    initializeCell: function(cell) {
      var session = createCategorySession().appendTo(cell);
      cell.on("change:item", function(cell, item) {
        session.set("data", item);
      });
    },
    select: sessionSelectCallback
  }
};

function createCategorySession() {
  var categorySession = createSessionContainer()
    .on("change:data", function(widget, data) {
      imageView.set("image", data.image);
      titleTextView.set("text", data.title);
      timeframeTextView.set("text", data.timeframe);
    });
  var imageView = createSessionImage().appendTo(categorySession);
  var titleTextView = createSessionTextView().appendTo(categorySession);
  var timeframeTextView = tabris.create("TextView", {
    layoutData: {left: [imageView, 16], top: [titleTextView, 2]},
    font: "14px",
    textColor: colors.DRAWER_TEXT_COLOR
  }).appendTo(categorySession);
  return categorySession;
}

function sessionSelectCallback(widget, item) {
  SessionPage
    .create()
    .open()
    .set("data", viewDataProvider.getSession(item.id));
}

function createSession() {
  var sessionContainer = createSessionContainer()
    .on("change:data", function(widget, data) {
      imageView.set("image", data.image);
      titleTextView.set("text", data.title, 50);
      descriptionTextView.set("text", data.text);
    });
  var imageView = createSessionImage().appendTo(sessionContainer);
  var titleTextView = createSessionTextView().appendTo(sessionContainer);
  var descriptionTextView = tabris.create("TextView", {
    layoutData: {left: [imageView, 16], top: [titleTextView, 2], right: 8},
    font: "12px",
    maxLines: 2,
    textColor: colors.DRAWER_TEXT_COLOR
  }).appendTo(sessionContainer);
  return sessionContainer;
}

function createSessionContainer() {
  return tabris.create("Composite", {
    left: 16, right: 16, top: 0, height: 96
  });
}

function createSessionImage() {
  return tabris.create("ImageView", {
    id: "imageView",
    centerY: 0, width: 120, height: 72,
    scaleMode: "fill"
  });
}

function createSessionTextView() {
  return tabris.create("TextView", {
    layoutData: {left: ["prev()", 16], top: 12, right: 8},
    font: "bold 14px",
    maxLines: 2,
    textColor: colors.ACCENTED_TEXT_COLOR
  });
}