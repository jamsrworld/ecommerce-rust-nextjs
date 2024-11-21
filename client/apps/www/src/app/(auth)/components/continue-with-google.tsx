import { continueWithGoogleMutation } from "@/client/@tanstack/react-query.gen";
import { env } from "@/env";
import { Button, toast } from "@jamsr-ui/react";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
  type CredentialResponse,
} from "@react-oauth/google";
import { GoogleIcon } from "@repo/icons/social";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLoginRedirect } from "../login/_lib/hooks/use-login-redirect";

const ContinueWithGoogleBase = () => {
  const redirectPathname = useLoginRedirect();
  const mutationCountLogin = useIsMutating({
    mutationKey: ["login"],
  });
  const mutationCountRegister = useIsMutating({
    mutationKey: ["register"],
  });
  const isMutating = mutationCountLogin > 0 || mutationCountRegister > 0;

  const router = useRouter();
  const mutation = useMutation({
    ...continueWithGoogleMutation(),
    onSuccess() {
      console.log("here");
      router.replace(redirectPathname);
      router.refresh();
    },
  });

  const handleResponse = (code: string) => {
    mutation.mutate({ body: { authorizationCode: code } });
  };

  const handleOneTapResponse = (response: CredentialResponse) => {
    if (response.credential) {
      return mutation.mutate({ body: { credential: response.credential } });
    }
    return toast.error("Unable to get credential");
  };

  useGoogleOneTapLogin({
    // cancel_on_tap_outside: false,
    // auto_select: true,
    onSuccess(credentialResponse) {
      handleOneTapResponse(credentialResponse);
    },
    onError() {
      toast.error("Verification failed.");
    },
  });

  const handleClick = useGoogleLogin({
    flow: "auth-code",
    onSuccess(res) {
      handleResponse(res.code);
    },
    onError() {
      toast.error("Verification failed.");
    },
  });

  return (
    <Button
      color="danger"
      variant="outlined"
      size="lg"
      startContent={<GoogleIcon />}
      onClick={() => handleClick()}
      isDisabled={isMutating}
    >
      Continue with Google
    </Button>
  );
};

export const ContinueWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ContinueWithGoogleBase />
    </GoogleOAuthProvider>
  );
};
