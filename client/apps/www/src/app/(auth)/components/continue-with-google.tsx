import { continueWithGoogleMutation } from "@/client/@tanstack/react-query.gen";
import { REDIRECT_AFTER_LOGIN } from "@/config/app";
import { Button, toast } from "@jamsr-ui/react";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
  type CredentialResponse,
} from "@react-oauth/google";
import { GoogleIcon } from "@repo/icons/social";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ContinueWithGoogleBase = () => {
  const router = useRouter();
  const mutation = useMutation({
    ...continueWithGoogleMutation(),
    onSuccess() {
      router.push(REDIRECT_AFTER_LOGIN);
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
    cancel_on_tap_outside: false,
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
    >
      Continue with Google
    </Button>
  );
};

export const ContinueWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ContinueWithGoogleBase />
    </GoogleOAuthProvider>
  );
};
