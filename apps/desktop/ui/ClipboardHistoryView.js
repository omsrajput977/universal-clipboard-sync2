// apps/desktop/ui/ClipboardHistoryView.js

export class ClipboardHistoryView {
  constructor(container, onItemClick) {
    this.container = container;
    this.onItemClick = onItemClick;
  }

  render(history) {
    this.container.innerHTML = "";

    history
      .slice()
      .reverse()
      .forEach((item) => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "8px";
        div.style.marginBottom = "6px";
        div.style.cursor = "pointer";

        const time = new Date(item.timestamp).toLocaleTimeString();

        div.innerHTML = `
          <strong>${item.content}</strong><br/>
          <small>from ${item.sourceDeviceId} • ${time}</small>
        `;

        div.onclick = () => this.onItemClick(item);

        this.container.appendChild(div);
      });
  }
}
