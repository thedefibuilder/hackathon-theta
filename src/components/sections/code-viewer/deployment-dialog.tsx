import React, { useEffect, useState } from 'react';

import type { TDeployContractAction, TDeployContractState } from '@/lib/reducers/deploy-contract';

import EReducerState from '@/lib/reducer-state';
import { cn } from '@/lib/utils';

import InfoBox from '../../info-box';
import LoadingButton from '../../loading-button';
import SuccessfulTransaction from '../../successful-transaction';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { type TConstructorArgument, type TConstructorArgumentValue } from './code-viewer-section';

type TDeploymentDialog = {
  constructorArguments: TConstructorArgument[];
  constructorArgumentsValue: TConstructorArgumentValue;
  deployContractState: TDeployContractState;
  dispatchDeployContract: React.Dispatch<TDeployContractAction>;
  setConstructorArgumentsValue: React.Dispatch<React.SetStateAction<TConstructorArgumentValue>>;
  onDeployClick: () => void;
};

export default function DeploymentDialog({
  constructorArguments,
  constructorArgumentsValue,
  deployContractState,
  dispatchDeployContract,
  setConstructorArgumentsValue,
  onDeployClick
}: TDeploymentDialog) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      const constructorArgumentsValue: TConstructorArgumentValue = {};

      for (const argument of constructorArguments) {
        constructorArgumentsValue[argument.name] = '';
      }

      setConstructorArgumentsValue(constructorArgumentsValue);
    }

    if (!isDialogOpen && deployContractState.isError) {
      dispatchDeployContract({ state: EReducerState.reset, payload: null });
    }
  }, [
    isDialogOpen,
    constructorArguments,
    setConstructorArgumentsValue,
    deployContractState,
    dispatchDeployContract
  ]);

  function onConstructorArgumentValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setConstructorArgumentsValue({ ...constructorArgumentsValue, [name]: value });
  }

  function onDialogOpenChange(isOpen: boolean) {
    if (deployContractState.isLoading) {
      return;
    }

    setIsDialogOpen(isOpen);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className='w-full md:w-auto'>Deploy Smart Contract</Button>
      </DialogTrigger>

      <DialogContent className='max-h-[calc(100%-5rem)] overflow-y-auto'>
        {!deployContractState.isSuccess && (
          <DialogHeader>
            <DialogTitle>Deploy Smart Contract</DialogTitle>
            {constructorArguments.length > 0 && (
              <DialogDescription>Provide the arguments for the constructor.</DialogDescription>
            )}
          </DialogHeader>
        )}

        {deployContractState.isSuccess ? (
          <SuccessfulTransaction
            content='Smart Contract deployed successfully'
            onCloseClick={() => setIsDialogOpen((previousState) => !previousState)}
          />
        ) : (
          <>
            <form className='flex flex-col gap-y-5'>
              {constructorArguments.map((argument, index) => (
                <div key={`${argument.name}-${index}`} className='flex flex-col gap-y-2.5'>
                  <Label
                    htmlFor={argument.name}
                    className={cn({
                      'cursor-not-allowed opacity-50': deployContractState.isLoading
                    })}
                  >
                    <span>{argument.name}</span>
                  </Label>

                  <div className='relative'>
                    <Input
                      id={argument.name}
                      name={argument.name}
                      value={constructorArgumentsValue[argument.name]}
                      placeholder={`Fill in ${argument.name} argument`}
                      disabled={deployContractState.isLoading}
                      onChange={onConstructorArgumentValueChange}
                    />

                    <span
                      className={cn(
                        'absolute right-0 top-0 flex h-full items-center justify-center rounded-r-md border-y border-r bg-background px-1.5 pr-3 text-xs text-muted-foreground',
                        {
                          'cursor-not-allowed opacity-50': deployContractState.isLoading
                        }
                      )}
                    >
                      {argument.type}
                    </span>
                  </div>
                </div>
              ))}
            </form>

            <InfoBox type='info'>
              Smart contracts are supplied &quot;as is&quot; without any warranties. We are not
              responsible for any potential financial losses incurred.
            </InfoBox>

            {deployContractState.isError && (
              <InfoBox type='error'>{deployContractState.errorMessage}</InfoBox>
            )}

            <DialogFooter>
              <LoadingButton
                isLoading={deployContractState.isLoading}
                loadingContent='Deploying Smart Contract'
                defaultContent='Deploy Smart Contract'
                disabled={deployContractState.isLoading}
                className='w-full'
                onClick={onDeployClick}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
