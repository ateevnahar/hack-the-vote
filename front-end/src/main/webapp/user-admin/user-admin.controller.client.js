(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $userRowTemplate, $tbody;
    var $userList, users;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {

        $userList = $("#userList")
        $usernameFld = $("#usernameFld")
        $passwordFld = $("#passwordFld")
        $firstNameFld = $("#firstNameFld")
        $lastNameFld = $("#lastNameFld")
        $roleFld = $("#roleFld")

        $createBtn = $("#createBtn")
        $createBtn.click(createUser)

        $editBtn = $("#editBtn")
        $editBtn.click(editUser)

        $updateBtn = $("#updateBtn")
        $updateBtn.click(updateUser)

        $removeBtn = $("#removeBtn")
        $removeBtn.click(() => deleteUser(user))

        users = []

        userService
            .findAllUsers()
            .then(theusers => {
                users = theusers
                renderUsers(users)
            })

    }

    function createUser() {
        const newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("")

        userService.createUser(newUser)
            .then(actualUser => {
                //console.log(actualUser)
                users.push(actualUser)
                renderUsers(users)
            })
    }

    function findAllUsers() {
        userService
            .findAllUsers()
            .then(theusers => {
                users = theusers
                renderUsers(users)
            })

    }

    function findUserById(_id) {
        userService.findUserById(_id)
        .then(actualUser => {
            $usernameFld.val(actualUser.username)
            $passwordFld.val(actualUser.password)
            $firstNameFld.val(actualUser.firstName)
            $lastNameFld.val(actualUser.lastName)
            $roleFld.val(actualUser.role)
            renderUsers(users)
        })
     }

    function deleteUser(index) {
        let user = users[index]
        let userId = user._id
        userService.deleteUser(userId)
            .then(response => {
                users.splice(index, 1)
                renderUsers(users)
            })
    }

    // did not use as did not get to search bar.
    function selectUser() { }

    let currentUserIndex = -1
    function editUser(index) {
        currentUserIndex = index
        const user = users[index]
        const _id = user._id
        findUserById(_id)

    }

    function updateUser() {
        const updatedUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("")

        updatedUser._id = users[currentUserIndex]._id

        userService.updateUser(updatedUser._id, updatedUser)
            .then((actualUser) => {
                findAllUsers()
            })
        
        

    }

    // did not use as did not get to search bar.
    function renderUser(user) { }

    function renderUsers(users) {
        $userList.empty()
        for (let i in users) {
            const user = users[i]

            let $removeUserBtn = $(`<i id="wbdv-remove" class="fa-2x fa fa-times wbdv-remove" id="removeBtn"></i>`)
            $removeUserBtn.click(() => deleteUser(i))
            let $editUserBtn = $(`<i id="wbdv-edit" class="fa-2x fa fa-pencil wbdv-edit" id="editBtn"></i>`)
            $editUserBtn.click(() => editUser(i))

            let btnCol = $(`
            <td class="wbdv-actions">

            </td`)
            btnCol.append($removeUserBtn)
            btnCol.append($editUserBtn)

            let rowUser = $(`
                <tr class="wbdv-template wbdv-user wbdv-hidden">
                    <td class="wbdv-username">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="wbdv-first-name">${user.firstName}</td>
                    <td class="wbdv-last-name">${user.lastName}</td>
                    <td class="wbdv-role">${user.role}</td>
                    <td class="wbdv-actions">
                </tr>
            `).append(btnCol)
            $userList.append(rowUser)
        }
    }
})()
