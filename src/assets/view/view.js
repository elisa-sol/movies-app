// export class View {
//   constructor() {
//     this.app = document.querySelector('.app');
//     this.title = this.createElement('h1', 'title');
//     this.title.textContent = 'GitHub Search Users';
//
//     this.searchLine = this.createElement('div', 'searchLine');
//     this.searchInput = this.createElement('input', 'searchInput');
//     this.searchCounter = this.createElement('span', 'counter');
//     this.searchLine.append(this.searchInput);
//     this.searchLine.append(this.searchCounter);
//
//     this.dropdown = this.createElement('div', 'dropdown');
//     this.searchLine.append(this.dropdown);
//
//     this.usersWrapper = this.createElement('div', 'usersWrapper');
//     this.usersList = this.createElement('ul', 'usersList');
//     this.usersWrapper.append(this.usersList);
//
//     this.main = this.createElement('div', 'main');
//     this.main.append(this.usersWrapper);
//
//     this.app.append(this.title);
//     this.app.append(this.searchLine);
//     this.app.append(this.main);
//   }
//
//   createElement(elementTag, elementClass) {
//     const element = document.createElement(elementTag);
//     if (elementClass) {
//       element.classList.add(elementClass);
//     }
//     return element;
//   }
//
//   createRepositoryItem(repoData) {
//     const repoElement = this.createElement('p', 'repo-item');
//     repoElement.innerHTML = `Name: ${repoData.full_name.split('/')[0]}<br>
//         Owner: ${repoData.name}<br>
//         Stars: ${repoData.stargazers_count}`;
//     const deleteButton = this.createElement('button', 'deleteButton');
//     deleteButton.textContent = 'Удалить';
//     deleteButton.addEventListener('click', () => {
//       repoElement.remove();
//     });
//     repoElement.append(deleteButton);
//     this.usersList.append(repoElement);
//     this.searchInput.value = '';
//   }
//
//   createDropdownItem(repoData) {
//     const repoElement = this.createElement('div', 'dropdown-item');
//     repoElement.addEventListener('click', () => {
//       this.searchInput.value = repoData.full_name.split('/')[1];
//       this.createRepositoryItem(repoData);
//       this.clearDropdown();
//     });
//
//     repoElement.textContent = repoData.full_name.split('/')[1];
//     this.dropdown.append(repoElement);
//   }
//
//   clearDropdown() {
//     this.dropdown.innerHTML = '';
//   }
// }
