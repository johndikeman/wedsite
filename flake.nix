{
  description = "A development shell for Supabase";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    {
      devShells.x86_64-linux.default =
        let
          pkgs = nixpkgs.legacyPackages.x86_64-linux;
        in
        pkgs.mkShell {
          buildInputs = [
            pkgs.supabase-cli
            pkgs.podman
            pkgs.lazygit
          ];

          shellHook = ''
            export DOCKER_HOST="unix:///run/user/1000/podman/podman.sock"
            systemctl --user enable podman.socket
            systemctl --user start podman.socket
            fish
          '';
        };
    };
}
