class CustomAuthUser:
    pk = 0
    roles = []
    is_authenticated = False

    def has_perms(self, other):
        return True

    def __str__(self):
        return "User: " + str(self.pk) + " roles: " + str(self.roles)
